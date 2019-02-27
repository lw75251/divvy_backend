import { UserDAO } from "../data_access/UserDAO";
import { User, UserOptions } from "../models/User";
import { UserValidator } from "../validation/UserValidator";
import { DocumentReference } from "@google-cloud/firestore";

export class UserController {

    private userDAO: UserDAO;
    constructor() {
        this.userDAO = new UserDAO();
    }

    public async createUser( userData: UserOptions): Promise<boolean> {

        // step 1: Validate
        const userValidator = new UserValidator();
        const result = userValidator.validateUser(userData);        

        // TODO: Check if User Already Exists in DB
        if ( await this.checkUserExists(userData["uid"]) || result.error) {
            return false;
        }

        // Step 2 : Create User Object
        const newUser = new User(userData);

        // Step 3: Use DAO to write to firestore
        this.userDAO.writeToFireStore(newUser);

        return true;
    }

    public async getUser( uid: string ): Promise<User> {

        let userOptions = null;
        let user = null;
        await this.userDAO.getUserOptions(uid).then( data => {
            userOptions = data;
            user = new User(userOptions);
        })
        .catch( err => {
            console.error("No User");
        });
        return user;
    }

    // TODO: Check if User Already Exists in DB
    public async checkUserExists(uid: string): Promise<boolean> {
        return await this.userDAO.userRefExists(uid);
    }

}
