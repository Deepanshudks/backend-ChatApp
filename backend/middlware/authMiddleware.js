const jwt  =require("jsonwebtoken");
const User = require("../models/user");
const AsyncHandler = require("express-async-handler");

const protect = AsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decorded  = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decorded.id).select("-password");
            next();
        }catch(err){
        res.status(400);
        throw new Error("Not authorized, Login Error")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, Login Required")
    }
})
module.exports = protect
