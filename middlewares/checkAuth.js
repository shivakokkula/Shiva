import jwt from "jsonwebtoken";
import constants from "../utils/constants.js"
import dotenv from "dotenv";
dotenv.config();

const getToken = (phone,id,role,time) => {
    return jwt.sign({ phone: phone, id: id.toString(), role: role }, constants.SECRET, { expiresIn: time ? time+"M" : process.env.JWT_REFRESH_EXPIRATION_DAYS+"d" })
};

const checkToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
            jwt.verify(token, constants.SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Auth token is not valid' });
                } else {
                        req.user = decoded;
                        next();
                }
            });
        }
    }
    else {
        res.status(500).json({ message: 'Auth token is not supplied' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role == "admin") {
        next();
    }
    else {
        res.status(500).json({ message: 'Only admin can access this page' });
    }
};

const isVIP = (req, res, next) => {
    if (req.user.role == "admin" || req.user.role == "host") {
        next();
    }
    else {
        res.status(500).json({ message: 'Only host/admin can access this page' });
    }
};

export default { checkToken,isAdmin,isVIP,getToken }