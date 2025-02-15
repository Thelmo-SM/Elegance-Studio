import * as admin from "firebase-admin";
const firebaseAdminConfig = process.env.FIREBASE_ADMIN_KEY
  ? JSON.parse(process.env.FIREBASE_ADMIN_KEY)
  : null;

if (!firebaseAdminConfig || !firebaseAdminConfig.project_id) {
  throw new Error("Firebase service account is missing or invalid");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });
}

export const authAdmin = admin.auth();
export const dbAdmin = admin.firestore();
