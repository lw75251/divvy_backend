import * as Joi from "joi";
import { UserOptions } from "../models/User";

export class BillValidator {


    public validateBill = (billData) => {

        const schema = Joi.object().keys({
            userId: Joi.string(),
            timestamp: Joi.date()
            // TODO: Check if picture file attached
        });

        const result = Joi.validate(billData, schema);

        return result;
    }

}
