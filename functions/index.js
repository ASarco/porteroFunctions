// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.movePortero = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const docIdSource = req.query.source;
    const docIdDest = req.query.dest;

    functions.logger.log('Moving from ', docIdSource, " to ", docIdDest);
    let snapshot = admin.firestore().collection('portero').doc(docIdSource);
    let doc = await snapshot.get();

    const writeResult = await admin.firestore().collection('portero').doc(docIdDest).set(doc.data());
    // Send back a message that we've succesfully written the message
    res.json({result: `Document with ID: ${writeResult} added.`});
});
