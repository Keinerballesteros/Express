import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./src/config/apuestas-a52fc-firebase-adminsdk-fbsvc-c265aad36c.json', 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://apuestas-a52fc-default-rtdb.firebaseio.com"
});
export const db = admin.firestore();