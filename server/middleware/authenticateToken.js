const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JSONWEBTOKEN;

function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Assuming the JWT is stored in a cookie

    if (!token) {
        return res.status(403).json({ message: 'User not authenticated' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user; // Attach the decoded user info to the request
        console.log(req)
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateToken;
