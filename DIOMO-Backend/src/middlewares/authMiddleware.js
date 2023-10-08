const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("decode",decoded);
                const user = await User.findById(decoded?.id);
                console.log("User in Authmiddleware:", user);
                req.user = user;
                next();
            }
        } catch (error) {
            console.log("Authmiddleware error: ", error);
            throw new Error("Not Authorized. Token Expired. Please Login Again.")
        }
     } else {
        console.log("There is no token attached to headers");
        throw new Error("There is no token attached to headers");
    }
};

const isAdmin = async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin") {
        return res.status(403).json({ message: "You are not an admin." });
    }
    else {
        next();
    }
};

module.exports = { authMiddleware, isAdmin };