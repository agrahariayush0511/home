const express = require('express')
const jwt = require('jsonwebtoken')
const User = require("../db/userSchema")
const app = express()
const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.confirmtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})

        // console.log(rootUser)
        if(!rootUser) {
            throw new Error("user not found")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id
        res.send(req.rootUser)
    }
    catch (err) {
        res.status(401).send("unauthorize")
        console.log(err)
    }
    next();
    
}
module.exports = Authenticate;