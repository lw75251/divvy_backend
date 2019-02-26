import { UserDAO } from "../data_access/UserDAO";
import { User, userOptions } from "../models/User";
import { UserValidator } from "../validation/UserValidator";

export class UserController {

    public createUser( userData: userOptions): boolean {
        const userDAO = new UserDAO();

        // step 1: Validate
        const userValidator = new UserValidator();
        const result = userValidator.validateUser(userData);

        // TODO: Check if User Already Exists in DB
        if ( result.error ) {
            return false;
        }

        // Step 2 : Create User Object
        const newUser = new User(userData);

        // Step 3: Use DAO to write to firestore
        userDAO.writeToFireStore(newUser);

        return true;
    }

    // TODO: Check if User Already Exists in DB
    public checkUserExists(): boolean {
        return true;
    }
}
