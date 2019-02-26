import { string } from "joi";

export interface userOptions { 
    uid: string;
    displayName: string;
    email: string;
    company: string;
    photoURL: string;
}

export class User {

    public uid: string;
    public displayName: string;
    public email: string;
    public company: string;
    public photoURL: string;

    constructor( dict: userOptions ) {
        this.uid = dict.uid;
        this.displayName = dict.displayName;
        this.email = dict.email;
        this.company = dict.company;
        this.photoURL = dict.photoURL;
    }

    public getUserRef = () => this.uid;

    public toDict() {
        return {
            "uid" : this.uid,
            "displayName" : this.displayName,
            "email" : this.email,
            "company" : this.company,
            "photoURL" : this.photoURL
        };
    }
}
