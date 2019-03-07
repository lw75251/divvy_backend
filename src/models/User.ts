import { Bill } from "./Bill";

export interface UserOptions { 
    phoneNumber: string;
    email: string;
    displayName: string;
    uid: string;
    photoUrl: string;
    bills: Array<Bill>;
}

export class User {

    private uid: string;
    private displayName: string;
    private email: string;
    private phoneNumber: string;
    private photoUrl: string;
    private bills: Array<Bill>;

    constructor( userData: UserOptions ) {
        this.phoneNumber = userData.phoneNumber;
        this.email = userData.email;
        this.displayName = userData.displayName;
        this.uid = userData.uid;
        this.photoUrl = userData.photoUrl;
        this.bills = new Array<Bill>();
    }

    public getUid = () => this.uid;

    public toDict() {
        return {
            "phoneNumber" : this.phoneNumber,
            "email" : this.email,
            "displayName" : this.displayName,
            "uid" : this.uid,
            "photoUrl" : this.photoUrl
        };
    }
}
