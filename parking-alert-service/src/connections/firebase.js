import admin from "firebase-admin";
import serviceAccount from "../config/parking-alerts-key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  authDomain: "parking-alerts.firebaseapp.com",
  databaseURL: "https://parking-alerts.firebaseio.com",
});

const firestore = admin.firestore();
const realtimedb = admin.database();

export default {
  firestore,
  admin,
  realtimedb,
}
