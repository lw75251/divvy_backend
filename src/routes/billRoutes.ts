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

        app.route("/bill/:billId")
            .get( async (req: Request, res: Response) => {
                const billId: string = req.params["billId"];
                console.log(billId);
                const bill: Bill = await this.billController.getBill(billId);
                console.log(bill.toDict());
                if( bill != null) {
                    res.status(200).send({
                        message: bill.toDict()
                    });
                } else {
                    res.status(500).send({
                        message: "Failed to create Bill"
                    });
                }

            })

            // TODO: Implement Delete Bill
            .delete( (req: Request, res: Response) => {


            })

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

        app.route("/bill/join")
            .put( async (req: Request, res: Response) => {
                const message =  await this.billController.joinBill(req.body);
                if ( message == null || message == false ) {
                    res.status(500).send({
                        message: "Could not join Active Bill"
                    });
                } else {
                    res.status(200).send({
                        billId: message
                    });
                }
            });
    }
}