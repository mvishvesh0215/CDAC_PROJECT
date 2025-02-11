const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = require('./config');

const verifyCustomerToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];  // Changed from "jwt" to "authorization"
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Get the token from the "Bearer <token>" part

    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // Verify the token with the SECRET_KEY
        if (decoded.authorities !== "ROLE_CUSTOMER") {  // Check if the decoded role is 'ROLE_CUSTOMER'
            return res.status(403).json({ message: "Access denied" });
        }
        req.user = decoded;  // Attach the decoded user information to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });  // Invalid token
    }
};

module.exports = verifyCustomerToken;
