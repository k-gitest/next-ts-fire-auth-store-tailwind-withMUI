import admin from 'firebase-admin'

// Firebase admin SDK initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    }),
    //databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

const adminAuth = admin.auth()
const db = admin.firestore();
const serverTime = admin.firestore.Timestamp.now();
const serverTimeStamp = serverTime.toMillis();

// Verify Firebase ID token
const verifyIdToken = async (token: string) => {
  const decodedToken = await admin.auth().verifyIdToken(token)
  return decodedToken
}

export {adminAuth, db, verifyIdToken, serverTimeStamp}