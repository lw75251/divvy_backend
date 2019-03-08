import { Firestore } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

/** Firebase Documentation - Config FIREBASE */
const serviceAccount = process.env.MY_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: "https://divvy-d1a54.firebaseio.com"
});

export const db: Firestore = admin.firestore();
