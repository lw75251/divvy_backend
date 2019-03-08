import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { User } from "../models/User";


export class UserRoutes {

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


        app.route("/users")
            .post( async (req: Request, res: Response) => {

                console.log("POST USER ENDPOINT");
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

            .put( async (req: Request, res: Response) => {

                const uid: string = req.params["uid"];
                const body = req.body;

                if ( await this.userController.updateUser(body) ) {
                    res.status(200).send({
                        message: "Updated User!"
                    });
                } else {
                    res.status(500).send({
                        message: "Did not update User"
                    });
                }
            })

            .delete( async (req: Request, res: Response) => {
                const uid: string = req.params["uid"];
                if ( await this.userController.deleteUser(uid) ) {
                    res.status(200).send({
                        message: "Deleted User"
                    });
                } else {
                    res.status(500).send({
                        message: "User does not exist"
                    });
                }
            });
    }
}
