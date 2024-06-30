const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    nect(error);
}

const errorHandler = (req,res,next)=>{
    const statuscode = req.statuscode === 200 ?500 : res.statuscode;
    res.status(statuscode);
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === "production" ? null:err.stack
    })
}
module.exports = {notFound,errorHandler}