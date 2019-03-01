import Axios, * as axios from "axios";

interface APIKeys {
    apikey: string;
}

interface Header{
    headers: APIKeys;
}

export interface TaggunOptions {
    file: string;
    incognito: boolean;
    language: string;
}

export class TaggunController {
    private taggunOptions: JSON = require("../../../taggun.json");
    private apikey: string = this.taggunOptions["taggunApiKey"];

    /**
     * getReceiptJSON - Returns JSON from Taggun
       */
    public getReceiptJSON() {
        const url: string = "https://api.taggun.io/api/receipt/v1/verbose/file";
        const formData = {
            "file": "./340px-ReceiptSwiss.jpg",
            "incognito" : true,
            "language": "en"
        };
        const configs = {
            headers: { "apikey" : this.apikey }
        };

        this.postTaggunReceipt(url, formData, configs);
    }

    private async postTaggunReceipt (url: string, formData: TaggunOptions, configs: Header ) {
        
        return Axios.post(url,formData,configs)
        .then( (res) => {
            console.log("Upload Successful! Server responded with:", res);
            return true;
        })
        .catch( (err) => {
            console.error(err);
            return false;
        })
    }
}

