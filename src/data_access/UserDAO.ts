import { DocumentReference, CollectionReference, Firestore, DocumentSnapshot } from "@google-cloud/firestore";
import { db } from "../../configs/firebaseconfig";
import { UserOptions, User } from "../models/User";

export class UserDAO {

    private db : Firestore
    private colRef : CollectionReference

    constructor (){
        this.db = db;
        this.colRef = db.collection("users");
    };

    public getUserOptions =  async ( uid: string)  => {

        const snapshot = await this.colRef.doc(uid).get();
        if (!snapshot.exists) {
            return null;
        }
        else {
            return snapshot.data();
        }
    }

    public userRefExists = async ( uid: string ): Promise<boolean> => {

        let exists = false;
        await this.colRef.doc(uid).get()
        .then( snapshot => {
            if( snapshot.exists ) {
                exists = true;
            }
        }).catch( (err) => {
            console.error("Could not retrieve UserRef snapshot");
        })
        return exists;
    }

    public writeToFireStore( user : User ) {
        const docRef: DocumentReference = this.colRef.doc(user.getUid());
        docRef.set(user.toDict(), {merge: true});
    }

    public async removeFromFirestore( uid: string ): Promise<boolean>{
        await this.colRef.doc(uid).delete();
        return true;
    }
}