import { UserDAO } from "../data_access/UserDAO";
import { User, UserOptions } from "../models/User";
import { UserValidator } from "../validation/UserValidator";


export class UserController {

    private userDAO: UserDAO;
    constructor() {
        this.userDAO = new UserDAO();
    }

    public async createUser( userData: UserOptions): Promise<boolean> {

        console.log("CREATE USER METHOD")
        // step 1: Validate
        const userValidator = new UserValidator();
        const result = userValidator.validateUser(userData);        
        console.log("VALIDATE METHOD /// DONE ");
        console.log("Params being passed in: ", userData["uid"], result.error)
        if ( await this.checkUserExists(userData["uid"]) || result.error) {
            return false;
        }
        console.log("CHECK USER METHOD /// DONE");

        // Step 2 : Create User Object
        const newUser = new User(userData);

        // Step 3: Use DAO to write to firestore
        this.userDAO.writeToFireStore(newUser);
        console.log("WRITE USER METHOD TO FIRESTORE /// DONE");

        console.log("CREATE USER METHOD /// DONE");
        return true;
    }

    public async updateUser( userData: UserOptions): Promise<boolean> {

        const userValidator = new UserValidator();
        const result = userValidator.validateUser(userData);        

        if ( result.error) {
            return false;
        }

        const updatedUser = new User(userData);
        this.userDAO.writeToFireStore(updatedUser);

        return true;
    }

    public async getUser( uid: string ): Promise<User> {

        let userOptions = null;
        let user = null;
        await this.userDAO.getUserOptions(uid).then( data => {
            userOptions = data;
            user = new User(userOptions);
        })
        .catch( (err) => {
            console.error("No User", err);
        });
        return user;
    }

    public async deleteUser( uid: string ): Promise<boolean> {
        return await this.userDAO.removeFromFirestore(uid);
    }

    public async checkUserExists(uid: string): Promise<boolean> {
        return await this.userDAO.userRefExists(uid);
    }

}
