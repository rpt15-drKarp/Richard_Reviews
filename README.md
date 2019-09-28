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
``
  Make sure you have all of the appropriate dependencies: "npm install"
  To start the node app: "npm run start"
  To seed the database: "npm run seed"
  To run the tests: "npm run test"
``

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
