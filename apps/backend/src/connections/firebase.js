import admin from 'firebase-admin';
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT ||
    `{
  "type": "service_account",
  "project_id": "parking-alerts",
  "private_key_id": "x",
  "private_key": "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-idb2c@parking-alerts.iam.gserviceaccount.com",
  "client_id": "x",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-idb2c%40parking-alerts.iam.gserviceaccount.com"
  }`,
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  authDomain: 'parking-alerts.firebaseapp.com',
  databaseURL: 'https://parking-alerts.firebaseio.com',
});

const firestore = admin.firestore();
const realtimedb = admin.database();

export default {
  firestore,
  admin,
  realtimedb,
};
