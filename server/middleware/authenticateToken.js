const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JSONWEBTOKEN;

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decodedUser = jwt.verify(token, JWT_SECRET);
        req.user = decodedUser; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateToken;
