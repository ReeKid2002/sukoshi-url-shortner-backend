const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = { // These are the important key-value pair need to config the firebase to use firestore database.
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.auth_provider_x509_cert_url
  }

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

const db = getFirestore(); //Using Firestore DB
const Url = db.collection("Urls"); //It's same as the model (after creating Schema) in MongoDB;

// console.log(Url);

module.exports = Url;