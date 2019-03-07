import { Firestore } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

/** Firebase Documentation - Config FIREBASE */
// const serviceAccount = require("../../divvy-d1a54-firebase-adminsdk-6zgy9-660c566562.json");
const serviceAccount = process.env.serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://divvy-d1a54.firebaseio.com"
});

export const db: Firestore = admin.firestore();
