# Tandem News
##### News In Perspective

### Overview

  Tandem-Public-API Repo contains the Web/API Server for the Tandem News Project.

## Getting Started

#### 1. Clone the latest version

  Start by cloning the latest version of Tandem-Public-API on your local machine by running:

  ```sh
  $ git clone https://github.com/Tandem4/Tandem-Public-API
  $ cd Tandem-Public-API
  ```

#### 2. Install Dependencies

  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Set Up Environment Variables

  ```sh
  // Nodemailer email service configuration for sending verification emails on signup
  process.env.TANDEM_NODE_MAILER_SERVICE,
  process.env.TANDEM_NODE_MAILER_USER,
  process.env.TANDEM_NODE_MAILER_PASS

  // Set JSON Web Token secret for signing JWT tokens
  process.env.JWT,

  // Set Redis host, port & password information for purposes of API throttling
  process.env.TANDEM_DO_REDIS_HOST
  process.env.TANDEM_DO_REDIS_PORT
  process.env.TANDEM_DO_REDIS_PW
  ```

#### 4. Getting started

  To run the server, execute the below depending on the environment:

  ```sh
  //Development environment
  $ npm run start-dev

  //Production environment
  $ npm run start-prod

  ```

## Site Architecture

  ![Site Architecture](https://raw.githubusercontent.com/NCSkoglund/Tandem-Analysis/a80f9271e9ed9ac5420a1f65d5b2864537a2e497/images/Tandem_Architecture.png)
  
## Sequence Diagram 
 
   ![Sequence Diagram](https://raw.githubusercontent.com/NCSkoglund/Tandem-Analysis/merge-harmony/images/sequence_diagram.png) 

## Schema Diagram

  ![Schema Diagram](https://raw.githubusercontent.com/Tandem4/Tandem-Analysis/master/images/DB_schema.png)

## Folder Guide

```
├── README.md
├── dump.rdb
├── index.js
├── package.json
├── server
│   ├── api
│   │   └── v1
│   │       ├── api.js
│   │       ├── article
│   │       │   ├── articleController.js
│   │       │   └── articleRoutes.js
│   │       └── trend
│   │           ├── trendController.js
│   │           └── trendRoutes.js
│   ├── auth
│   │   ├── auth.js
│   │   ├── authController.js
│   │   └── authRoutes.js
│   ├── config
│   │   ├── config.js
│   │   ├── constants.example.js
│   │   ├── constants.js
│   │   └── mongoConfig.js
│   ├── middleware
│   │   ├── apiRateLimiter.js
│   │   └── appMiddleware.js
│   ├── server.js
│   ├── utils
│   │   └── mail.js
│   └── views
│       ├── admin.pug
│       ├── article.pug
│       ├── base.pug
│       ├── index.pug
│       ├── login.pug
│       └── signup.pug
└── test
    └── test.js

```

## Tandem Team

  - Product Owner      :  Asifuzzaman Ahmed
  - Scrum Master       :  Nicole Skoglund
  - Development Team   :  Asifuzzaman Ahmed, Nicole Skoglund, 
                          Brett Lensvelt, Kani Munidasa

# Contributing

See CONTRIBUTING.md for contribution guidelines.
