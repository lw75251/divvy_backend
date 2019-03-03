import { DocumentReference, CollectionReference, Firestore, FieldValue } from "@google-cloud/firestore";
import { db } from "../../configs/firebaseconfig";
import { UserOptions, User } from "../models/User";
import { Bill } from "../models/Bill";

export class BillDAO {

    private db : Firestore
    private activeRef : CollectionReference
    private inActiveRef: CollectionReference

    constructor (){
        this.db = db;
        this.activeRef = db.collection("activebills");
        this.inActiveRef = db.collection("bills");
    };

    public getBillOptions =  async ( uid: string)  => {

        const snapshot = await this.inActiveRef.doc(uid).get();
        if (!snapshot.exists) {
            return null;
        }
        else {
            return new Bill(snapshot.data());
        }
    }

    public billRefExists = async ( uid: string ): Promise<boolean> => {

        let exists = false;
        await this.activeRef.doc(uid).get()
            .then( snapshot => {
                if( snapshot.exists ) {
                    exists = true;
                }
            })

        await this.inActiveRef.doc(uid).get()
            .then( (snapshot) => {
                if ( snapshot.exists ) {
                    exists = true;
                }
            })

        return exists;
    }

    public async joinActiveBill( joinKey: string, userId: string ): Promise<string|boolean> {
        let joined: string | boolean = false;
        console.log(joinKey, userId);
        await this.activeRef.where("joinKey", "==", joinKey).get()
            .then( (snapshot) => {
                snapshot.docs.forEach( (docSnapshot) => {
                    console.log(docSnapshot.id);
                    this.joinBillFirestore(docSnapshot.id,userId);
                    joined = docSnapshot.id;
                })
            })
            .catch( err => {
                console.error("No Active Bill", err);
            });
        return joined;
    }

    private joinBillFirestore( billId: string, userId: string) {

        this.activeRef.doc(billId).update({
            users: FieldValue.arrayUnion(userId)
        }).catch (err => {
            console.error("Could not write to active bill", err);
        })

    }

    private removeBillFirestore( billId: string, userId: string) {

        this.activeRef.doc(billId).update({
            users: FieldValue.arrayRemove(userId)
        }).catch (err => {
            console.error("Could not write to active bill", err);
        })
        
    }


    public writeToFireStore( bill : Bill ) {
        const docRef: DocumentReference = this.activeRef.doc();
        bill.setUid(docRef.id);
        docRef.set(bill.toDict(), {merge: true});
    }

    public async removeFromFirestore( uid: string ): Promise<boolean>{
        await this.inActiveRef.doc(uid).delete();
        return true;
    }
}