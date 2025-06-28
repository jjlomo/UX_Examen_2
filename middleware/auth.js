const admin = require('../firebase-config');

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

module.exports = verifyToken;
