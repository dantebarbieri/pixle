// The Cloud Functions for Firebase SDK to create
// Cloud Functions and set up triggers.
import * as functions from "firebase-functions";

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getTitles = functions.https.onCall(async (_data, _context) => {
  const res = await admin.firestore().collection("content")
      .select("title")
      .get();
  return res.docs.map((doc) => doc.get("title"));
});

// year=2022, month=May (idx=4), day=20
const FIRST_DAY = new Date(2022, 4, 20).getTime();

export const getDailyWork = functions.https.onCall(async (data, _context) => {
  const day = Math.floor((data as number - FIRST_DAY) /
      (1000 * 60 * 60 * 24)) + 1;
  const res = await admin.firestore().collection("content")
      .where("day", "==", day)
      .get();
  return res.docs[0]?.data();
});
