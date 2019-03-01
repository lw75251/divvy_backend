import { User } from "./User";
import { Item } from "./Item";

export interface BillOptions {
    uid: string;
    // restaurantId: string;
    timestamp: Date;
    userId: string;
    // items: Array<Item>;
}


export class Bill {

    private uid: string;
    // private restaurantId: string;
    private timestamp: Date;
    private users: Array<string>;
    // private items: Array<Item>;

    constructor( billData ) {
        // this.uid = billData["uid"];
        // this.restaurantId = billData["restaurantId"];
        this.timestamp = billData["timestamp"];
        // this.items = billData["items"];

        this.users = new Array<string>();
        this.users.push(billData["userId"]);

    }

    public getUid = () => this.uid;
    public setUid(uid: string) {this.uid = uid;}
    // public getResturantId = () => this.restaurantId;
    public getTimestamp = () => this.timestamp;
    public getUsers = () => this.users;
    // public getItems = () => this.items;

    public toDict() {
        return {
            "uid": this.uid,
            // "restaurantId": this.restaurantId,
            "timestamp": this.timestamp,
            "users": this.users,
            // "items": this.items
        };
    }
}
