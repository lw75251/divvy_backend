# alfred_backend
Alfred uses Node.js Express.js to write the server logic and RESTful API Endpoints

## Structure

### Dist
Dont touch these files. After ts compiles the files for production, they will go into this folder. basically don't touch this folder.

### Src

#### Controllers
There are two steps that a controller does:
1. Validate Received Data
2. Perform necessary 
3. Calls the DAO to make changes to the Database

#### Data Access
These are objects that can actually write to the database

#### 

## Packages
* dotenv
* typescript
* tslint
* ts-node
* @types/node
* @types/express
* express
* nodemon
* joi

## Node Express Tutorials Used
* [Mosh Video](https://www.youtube.com/watch?v=pKd0Rpw7O48)
* [ExpressJS Tutorial](https://expressjs.com/en/starter/basic-routing.html)

## TypeScript Tutorials Used
* [Express + TypeScript](https://developer.okta.com/blog/2018/11/15/node-express-typescript)