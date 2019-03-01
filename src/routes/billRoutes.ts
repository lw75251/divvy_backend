import * as express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { BillController } from "../controllers/BillController";


export class BillRoutes {

    private userController: UserController;
    private billController: BillController;

    constructor() {
        this.userController = new UserController();
        this.billController = new BillController();
    }

    public routes(app: express.Application): void {

        app.route("/bill/create")
            .post( async (req: Request, res: Response) => {
                
                if(this.billController.createBill(req.body)) {
                    res.status(200).send({
                        message: "Created Bill"
                    });
                } else {
                    res.status(500).send({
                        message: "Failed to create Bill"
                    });
                }


            })
    }
}