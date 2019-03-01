
import { BillDAO } from "../data_access/BillDAO";
import { Bill, BillOptions } from "../models/Bill";
import { BillValidator } from "../validation/BillValidator";
import { TaggunController } from "../api/taggun";


export class BillController {

    private billDAO: BillDAO;
    private taggunController: TaggunController;

    constructor() {
        this.billDAO = new BillDAO();
        this.taggunController = new TaggunController();
    }

    public async createBill( billData: BillOptions ): Promise<boolean> {

        const billValidator = new BillValidator();
        const result = billValidator.validateBill(billData);

        if (result.error) {
            return false;
        }

        // TODO: Make call to TaggunController. Fill out items, restuaurant
        // this.taggunController.getReceiptJSON(billData["file"]);

        const newBill = new Bill(billData);
        this.billDAO.writeToFireStore(newBill);

        return true;
    }

    public async checkBillExists(uid: string): Promise<boolean> {
        return await this.billDAO.billRefExists(uid);
    }
}
