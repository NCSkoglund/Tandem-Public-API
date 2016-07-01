var redis = require('redis');

//use default host & port for now
var client = redis.createClient();
const REQUEST_LIMIT_PER_MIN = 20;

//Handle errors
client.on('error', (err) => {
  console.log('Error: ', err, '\n', err.stack);
});

client.on('ready', () => {
  console.log('Connected to Redis client...');
})

//Helper function for creating Rate Limit custom headers object
var setRateLimitHeaders = (limit, remaining, rest) => {
  return {
    'X-Rate-Limit-Limit': limit,          //The number of allowed requests in the current period
    'X-Rate-Limit-Remaining': remaining  //The number of remaining requests in the current period
    // 'X-Rate-Limit-Reset': rest            //The number of seconds left in the current period
  };
};

//Rate Limiting middleware function for api - use limited by user only (vs by user + endpoint)
var rateLimiter = () => {
  return (req, res, next) => {
    //Redis namespace for throttling datastructures Redis LIST)
    const nameSpace = 'apireq:';
    //Get user id if authenticated, else try and id anonymous users by ip address (best guess)
    var id = (req.user && req.user.id) ? req.user.id : req.ip || req.ips;
    //Redis userKey for LIST datastructure
    var userKey = nameSpace + id;
    client.llen(userKey, (error, replies) => {
      //Handle errors
      if (error) {
        console.log(error);
        next(err);        
      //No previous requests; generate List & process API request
      } else if (!replies) {
        //Batch execute atomic commands
        client.multi()
          .rpush(userKey, 1)
          .expire(userKey, 60) //Set TTL to 60 seconds
          .exec((error, replies) => {
            //Set Rate Limit custom headers
            res.set(setRateLimitHeaders(REQUEST_LIMIT_PER_MIN, REQUEST_LIMIT_PER_MIN - replies[0]));
            next();
          });
      } else {
        //append to the list if it exists
        client.rpushx([userKey, 1], (error, replies) => {
          //Limit exceeded
          if (replies > REQUEST_LIMIT_PER_MIN) {
            //Set Rate Limit custom headers
            res.set(setRateLimitHeaders(REQUEST_LIMIT_PER_MIN, 0));
            //Set HTTP status code
            res.status(429).send("Too Many Requests");
          //Within limit, process the request
          } else {
            //Set Rate Limit custom headers
            res.set(setRateLimitHeaders(REQUEST_LIMIT_PER_MIN, REQUEST_LIMIT_PER_MIN - replies));
            next();
          }
        })
      }
    });
  }
};

module.exports = rateLimiter;
