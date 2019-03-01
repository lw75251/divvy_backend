import { DocumentReference, CollectionReference, Firestore, DocumentSnapshot } from "@google-cloud/firestore";
import { db } from "../../configs/firebaseconfig";
import { UserOptions, User } from "../models/User";
import { Bill } from "../models/Bill";

export class BillDAO {

    private db : Firestore
    private colRef : CollectionReference

    constructor (){
        this.db = db;
        this.colRef = db.collection("bills");
    };

    public getBillOptions =  async ( uid: string)  => {

        const snapshot = await this.colRef.doc(uid).get();
        if (!snapshot.exists) {
            return null;
        }
        else {
            return snapshot.data();
        }
    }

    public billRefExists = async ( uid: string ): Promise<boolean> => {

        let exists = false;
        await this.colRef.doc(uid).get()
        .then( snapshot => {
            if( snapshot.exists ) {
                exists = true;
            }
        })
        return exists;
    }


    public writeToFireStore( bill : Bill ) {
        const docRef: DocumentReference = this.colRef.doc();
        bill.setUid(docRef.id);
        docRef.set(bill.toDict(), {merge: true});
    }

    public async removeFromFirestore( uid: string ): Promise<boolean>{
        await this.colRef.doc(uid).delete();
        return true;
    }
}