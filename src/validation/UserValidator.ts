import * as Joi from "joi";
import { UserOptions } from "../models/User";

export class UserValidator {

    // TODO: FIND THE TYPE
    public validateUser = (userData: UserOptions) => {

        // TODO: Add actually validation other than class type
        const schema = Joi.object().keys({
            uid: Joi.string(),
            displayName: Joi.string(),
            email: Joi.string(),
            // company: Joi.string(),
            phoneNumber: Joi.any(),
            photoUrl: Joi.string().optional()
        });

        const result = Joi.validate(userData, schema);

        return result;
    }

}
