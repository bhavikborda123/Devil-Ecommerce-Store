const jwt = require("jsonwebtoken");
const userModel = require("../models/users");


const JWT_SECRET = process.env.JWT_SECRET;

exports.loginCheck = (req, res, next) => {
    try {
        let token = req.headers.token;
        token = token.replace("Bearer ", "");
        decode = jwt.verify(token, JWT_SECRET);
        req.userDetails = decode;
        next();
    } catch (err) {
        res.status(403).json({ error: "You must be logged in" });
    }
};

exports.isAuth = (req, res, next) => {
    let { loggedInUserId } = req.body;
    if (!loggedInUserId || !req.userDetails._id || loggedInUserId != req.userDetails._id) {
        res.status(403).json({ error: "You are not authenticate" });
    }
    next();
};

exports.isAdmin = async (req, res, next) => {
    try {
        let reqUser = await userModel.findById(req.body.loggedInUserId);
        // If user role 0 that's mean it's customer
        if (reqUser.userRole === 0) {
            res.status(403).json({ error: "Access denied" });
        }
        next();
    } catch {
        res.status(404);
    }
};
