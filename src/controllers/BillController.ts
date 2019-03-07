
import { BillDAO } from "../data_access/BillDAO";
import { Bill, BillOptions } from "../models/Bill";
import { BillValidator } from "../validation/BillValidator";
import { TaggunController } from "../api/taggun";


export class BillController {

    private billDAO: BillDAO;
    private billValidator: BillValidator;
    private taggunController: TaggunController;

    constructor() {
        this.billDAO = new BillDAO();
        this.billValidator = new BillValidator();
        this.taggunController = new TaggunController();
    }

    public async createBill( billData: BillOptions ): Promise<Bill> {

        const result = this.billValidator.validateBill(billData);

        if (result.error) {
            return null;
        }

        // TODO: Make call to TaggunController. Fill out items, restuaurant
        // this.taggunController.getReceiptJSON(billData["file"]);

        const newBill = new Bill(billData);
        this.billDAO.writeToFireStore(newBill);

        return newBill;
    }

    public async getBill( billId: string ): Promise<Bill> {
        return await this.billDAO.getActiveBill(billId);
    }

    public async joinBill( joinData ): Promise<string | boolean> {

        const result = this.billValidator.validateJoinBill(joinData);

        if ( result.error) {
            console.error(result.error);
            return false;
        }

        const addUser: string = joinData["userId"];
        const joinKey: string = joinData["joinKey"];

        return await this.billDAO.joinActiveBill(joinKey,addUser)
    }

    public async checkBillExists(uid: string): Promise<boolean> {
        return await this.billDAO.billRefExists(uid);
    }
}
