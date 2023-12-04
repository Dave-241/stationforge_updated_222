// /src/api/test.ts
// import admin from "@/app/utils/customclaim";
import firebaseConfig from "@/app/utils/fire_base_config";
import firebaseadmin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// firebaseadmin.initializeApp();

var serviceAccount = require("../../api/customClaims/service.json");
const firebaseAppName = "custom2";
if (firebaseadmin.apps.length > 0) {
  const firebase_app = firebaseadmin.app(firebaseAppName);

  console.log("Firebase app deleted and reinitialized.");
} else {
  console.log("Firebase Admin SDK is initialized.");
  firebaseadmin
    .initializeApp(
      {
        credential: firebaseadmin.credential.cert(serviceAccount),
        projectId: "fir-9-dojo-24129",
        databaseURL: "https://fir-9-dojo-24129.firebaseapp.com",
      },
      firebaseAppName,
    )
    .firestore();
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // firebaseadmin.initializeApp({
  //   credential: cert(serviceAccount),
  // });

  // const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  //  const db = getFirestore(app);
  // const otherauth = firebaseadmin.auth(firebaseadmin)
  try {
    firebaseadmin
      .auth()
      .listUsers()
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log("User ID:", userRecord.uid);
          console.log("Email:", userRecord.email);
          console.log("Display Name:", userRecord.displayName);
          console.log("========================");
        });
      })
      .catch((error) => {
        console.error("Error listing users:", error);
      });

    return NextResponse.json({ error: false }, { status: 200 });
  } catch (error) {
    console.error("Error during Firebase Admin SDK test:", error);

    return NextResponse.json({ error: true }, { status: 500 });
  }
}
