// /src/lib/firebase.ts
import admin from "firebase-admin";
import { getApps } from "firebase/app";
import { cert } from "firebase-admin/app";
var serviceAccount = require("../../app/api/customClaims/service.json");

if (!getApps().length) {
  admin.initializeApp(
    {
      credential: cert(serviceAccount),
    },
    "dkjj",
  );
  console.log("Firebase initialized.");
}

export default admin;
