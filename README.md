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

Upon getting to mysql terminal, run `source {path to db\mysql\schema.sql}` if there were changes made to the schema.

Implement mysql library for Javascript via `npm install mysql`.

Upon doing some research 2 things that I found that were interesting for performance.
  1. It is more efficient to run multiple INSERT statements than to run one INSERT statement with multiple values.
  2. A for loop is more efficient than a forEach loop.

### Cassandra

Start cassandra server by running `cassandra` in your terminal.

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

### Deployed App

Start by launching an EC2 instance with Amazon Linux AMI (NOT Linux 2)

Update EC2 instance:
```
sudo yum update
```

Install node in EC2 instance
```
Install nvm:
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
Activiate nvm:
  . ~/.nvm/nvm.sh
Install node version (used 10.16 for this service):
  nvm install 10.16
```

Install git and clone service:
```
  sudo yum install -y git
  git clone {git repo}
  cd {repo name}
  npm install
```

Install MySQL in EC2 instance:

Make sure your EC2 instance's security group includes an inbound rule for port 3306 (the default MySQL port).

Initially had trouble installing mysql-server on EC2 instance using mysql-server package.
Discovered that this was not due to any code issues but rather because I had originally launched my instance with the Linux 2 AMI, which does not come with an out-of-the-box mysql repo.
```
Install MySQL server:
  sudo yum install mysql-server
Set up MySQL server to automatically start with instance reboot:
  chkconfig mysqld on
Start MySQL server:
  service mysqld start
Update root user's password:
  mysqladmin -u root password {new password}
Seed database:
  source /home/ec2-user/Richard_Reviews/db/mysql/schema.sql
  cd Richard_Reviews
  npm run mysql:setup
```

#### Deployed App Benchmarks

| DBMS      | Route | RPS  | LATENCY | ERROR RATE |
| --------- | ----- | ---- | ------- | ---------- |
| MySQL     | GET   | 1    | 9 ms  | 0.00% |
| MySQL     | GET   | 10   | 11 ms | 0.00% |
| MySQL     | GET   | 100  | 5 ms | 0.00% |
| MySQL     | GET   | 1000  | 5749 ms | 71.2% |
| MySQL     | GET   | 2000  | 7760 ms | 68.4% |
| MySQL     | GET   | 5000  | 9512 ms | ERROR OUT |
| MySQL     | GET   | 10000  | 9657 ms | ERROR OUT |
| MySQL     | POST  | 1    | 8 ms | 0.00% |
| MySQL     | POST  | 10   | 7 ms | 0.00% |
| MySQL     | POST  | 100  | 4 ms | 0.00% |
| MySQL     | POST  | 1000 | 4070 ms | 60.8% |

### Optimizations

#### Horizontal Scaling

Separate server and database into 2 EC2 instances.
`Make sure to point MySQL host to database instance`

Grant access to database EC2 instance from any other instance:
```
  mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'root_password';
  mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
  mysql> FLUSH PRIVILEGES;
```

| DBMS      | Route | RPS  | LATENCY | ERROR RATE |
| --------- | ----- | ---- | ------- | ---------- |
| MySQL     | GET   | 1    | 10 ms  | 0.00% |
| MySQL     | GET   | 10   | 9 ms | 0.00% |
| MySQL     | GET   | 100  | 6 ms | 0.00% |
| MySQL     | GET   | 1000 | 5098 ms | 75.3% |
| MySQL     | GET   | 2000   | 8038 ms | 72.1% |
| MySQL     | GET   | 5000  | 14841 ms | ERROR OUT |
| MySQL     | GET   | 10000 | 23223 ms | ERROR OUT |

#### Caching with Redis

