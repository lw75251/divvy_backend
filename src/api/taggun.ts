import Axios, * as axios from "axios";

interface APIKeys {
    apikey: string;
}

interface Header{
    headers: APIKeys;
}

interface TaggunOptions {
    file: string;
    incognito: boolean;
    language: string;
}

class TaggunController {
    private taggunOptions: JSON = require("../../../apikeys.json");
    private apikey: string = this.taggunOptions["taggunApiKey"];

    /**
     * getReceiptJSON
       */
    public getReceiptJSON( filePath: string) {
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
        Axios.post(url,formData,configs)
    }
}

