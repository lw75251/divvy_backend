import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";

export class Routes {

    public routes(app: express.Application): void {

        app.route("/")
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });

        // Contact
        app.route("/user")
        // POST endpoint
        .post((req: Request, res: Response) => {

            const body = req.body;
            const userController = new UserController();

            if ( !userController.createUser(body) ) {
                res.status(500).send({
                    message: "Did not create User"
                });
            } else {
                res.status(200).send({
                    message: "Created New User!"
                });
            }
        });

        // Contact detail
        app.route("/contact/:contactId")
        // get specific contact
        .get((req: Request, res: Response) => {
        // Get a single contact detail
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });

    }
}
