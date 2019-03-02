import * as express from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { BillController } from "../controllers/BillController";
import { Bill } from "../models/Bill";


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
               
                let newBill: Bill = await this.billController.createBill(req.body);
                if( newBill != null) {
                    res.status(200).send({
                        message: newBill.toDict()
                    });
                } else {
                    res.status(500).send({
                        message: "Failed to create Bill"
                    });
                }


            })
    }
}