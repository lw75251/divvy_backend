import { Firestore } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

/** Firebase Documentation - Config FIREBASE */
// const serviceAccount = require("../../divvy-d1a54-firebase-adminsdk-6zgy9-660c566562.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://divvy-d1a54.firebaseio.com"
// });

const PROJECT_ID = process.env.PROJECT_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
const DATABASE_URL = process.env.DATABASE_URL;

console.log(PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY, DATABASE_URL);

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: CLIENT_EMAIL,
    privateKey: PRIVATE_KEY,
    projectId: PROJECT_ID
  }),
  databaseURL: DATABASE_URL
});

export const db: Firestore = admin.firestore();
