import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { User } from "../models/User";
import { request } from "http";

export class Routes {

    private userController: UserController;

    constructor() {
        this.userController = new UserController();
    }

    public routes(app: express.Application): void {

        app.route("/")
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });

        // Contact
        app.route("/users")
        // POST endpoint
        .post( async (req: Request, res: Response) => {

            const body = req.body;

            if ( await this.userController.createUser(body) ) {
                res.status(200).send({
                    message: "Created New User!"
                });
            } else {
                res.status(500).send({
                    message: "Did not create User"
                });
            }
        });

        app.route("/users/:uid")
        .get( async (req: Request, res: Response) => {

            const uid: string = req.params["uid"];
            const user: User = await this.userController.getUser(uid);
            if ( user == null ) {
                res.status(400).send({
                    message: "User Not Found"
                });
            }
            else {
                res.status(200).send({
                    message: user.toDict()
                });
            }
        })
        .put( (req: Request, res: Response) => {

            const uid: string = req.params["uid"];
            
        });


    }
}
