import * as bodyParser from "body-parser";
import * as express from "express";
import { UserRoutes } from "./routes/userRoutes";
import { BillRoutes } from "./routes/billRoutes";

class App {

    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public billRoutes: BillRoutes = new BillRoutes();

    constructor() {
        this.app = express();
        this.config();

        this.app.use(bodyParser.json());
        this.userRoutes.routes(this.app);
        this.billRoutes.routes(this.app);
        console.log("Routes setup");
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;

// const app : express.Application = express();
// const port = process.env.PORT || 3000

// app.use(express.json());
