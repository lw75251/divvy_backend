import { DocumentReference, CollectionReference, Firestore } from "@google-cloud/firestore";
import { db } from "../../configs/firebaseconfig";
import { User } from "../models/User";

export class UserDAO {

    db : Firestore
    colRef : CollectionReference

    constructor (){
        this.db = db;
        this.colRef = db.collection("users");
    };

    // TODO: Check to see if user already
    userIdExists = ( uid:string ) : boolean => {
        return null;
    }

    writeToFireStore( user : User ) {
        const docRef : DocumentReference = this.colRef.doc(user.getUserRef());
        docRef.set(user.toDict());
    }

}