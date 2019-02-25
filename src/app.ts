import express = require('express');
import * as bodyParser from "body-parser";
import Joi = require('joi');
import { Routes } from "./routes/userRoutes";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();      
        this.routePrv.routes(this.app);  
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;


// const app : express.Application = express();
// const port = process.env.PORT || 3000

// app.use(express.json());

