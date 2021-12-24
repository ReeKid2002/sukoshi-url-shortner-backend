const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = JSON.parse(process.env.GOOGLE_CREDS); // These are the important key-value pair need to config the firebase to use firestore database.

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

const db = getFirestore(); //Using Firestore DB
const Url = db.collection("Urls"); //It's same as the model (after creating Schema) in MongoDB;

// console.log(Url);

module.exports = Url;