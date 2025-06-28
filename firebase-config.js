// firebase-config.js
const admin = require('firebase-admin');
const serviceAccount = require('./uxfirebase-8b659-firebase-adminsdk-fbsvc-cd417e0893.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
