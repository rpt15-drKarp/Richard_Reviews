# Steam Reviews

> This is a clone of reviews microservice on the [Steam](https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/) product page.


## Table of Contents

  1. [Project specifications](#1-project-specifications)
      * 1.1 [Inherited Project](#11-inherited-project)
        - [Technologies](#technologies)
        - [Setup](#setup)
      * 1.2 [Related Projects](#12-related-projects)
        - [Proxy server](#micro-services)
        - [Microservices](#micro-services)
  2. [Choice of database](#2-choice-of-database)
  3. [Dev Log](#3-development-log)

## 1. Project specifications

### 1.1 Inherited Project

Sample of micro service:

  <p align="center"><img src="reviews screenshot.png" /></p>

#### Technologies

* Client: react, axios, webpack, babel
* Server: express
* Database: mongoDb
* Deployment: docker
* Test: jest

#### Setup

Deployment is done using docker-compose.

Run ``docker-compose up`` in the terminal and navigate to localhost in your browser. The service maps port 80 to port 3001, where the app is listening.

To build the app on your local desktop, clone the [repository](https://github.com/rpt15-drKarp/Richard_Reviews) and run the following commands:
```
  Make sure you have all of the appropriate dependencies: "npm install"
  To start the node app: "npm run start"
  To seed the database: "npm run seed"
  To run the tests: "npm run test"
```
CRUD APIs:
```
post -> /api/reviews -> send gameId in body
delete -> api/reviews -> send gameId in body
put -> api/reviews -> send gameId in body
```

### 1.2 Related Projects

#### [Proxy server](https://github.com/rpt15-drKarp/stephen_proxy)

#### Micro services
  * [Overview](https://github.com/rpt15-drKarp/alastair_overview)
  * [Photo Carousel](https://github.com/rpt15-drKarp/stephen_photoCarousel)
  * [Game Description](https://github.com/rpt15-drKarp/Therese_aboutGame)

## 2. Choice of Database

  * NoSQL: Cassandra
  * SQL: MySQL

## 3. Development Log

### MySQL

Connect to mysql by running `mysql -u root -p`. This will prompt you to enter your root user's password.

Upon getting to mysql terminal, run `source {path to db\mysql\schema.sql` if there were changes made to the schema.

Implement mysql library for Javascript via `npm install mysql`.

Upon doing some research 2 things that I found that were interesting for performance.
  1. It is more efficient to run multiple INSERT statements than to run one INSERT statement with multiple values.
  2. A for loop is more efficient than a forEach loop.

### DBMS Benchmarks

| DBMS      | Route | RPS  | LATENCY | ERROR RATE |
| --------- | ----- | ---- | ------- | ---------- |
| Cassandra | GET   | 1    | 3.24 ms  | 0.00% |
| Cassandra | GET   | 10   | 3.86 ms  | 0.00% |
| Cassandra | GET   | 100  | 13 ms  | 0.00% |
| Cassandra | GET   | 1000 | 85.4 ms  | 0.00% |
| Cassandra | POST  | 1    | 3.75 ms  | 0.00% |
| Cassandra | POST  | 10   | 3.36 ms  | 0.00% |
| Cassandra | POST  | 100  | 2.75 ms  | 0.00% |
| Cassandra | POST  | 1000 | 14 ms  | 0.00% |
| MySQL     | GET   | 1    | 2.29 ms  | 0.00% |
| MySQL     | GET   | 10   | 3.14 ms | 0.00% |
| MySQL     | GET   | 100  | 6.02 ms | 0.00% |
| MySQL     | GET   | 1000 | 41.9 ms | 0.00% |
| MySQL     | POST  | 1    | 4.26 ms | 0.00% |
| MySQL     | POST  | 10   | 7.22 ms | 0.00% |
| MySQL     | POST  | 100  | 11.2 ms | 0.00% |
| MySQL     | POST  | 1000 | 15.5 ms | 0.00% |
