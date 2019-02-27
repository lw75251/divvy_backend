
export interface UserOptions { 
    company: string;
    email: string;
    displayName: string;
    uid: string;
    photoURL: string;
}

export class User {

    private uid: string;
    private displayName: string;
    private email: string;
    private company: string;
    private photoURL: string;

    constructor( userData: UserOptions ) {
        this.company = userData.company;
        this.email = userData.email;
        this.displayName = userData.displayName;
        this.uid = userData.uid;
        this.photoURL = userData.photoURL;
    }

    public getUID = () => this.uid;

    public toDict() {
        return {
            "company" : this.company,
            "email" : this.email,
            "displayName" : this.displayName,
            "uid" : this.uid,
            "photoURL" : this.photoURL
        };
    }
}
