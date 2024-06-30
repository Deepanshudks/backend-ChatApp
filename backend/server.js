const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000
const {notFound,errorHandler} = require("./middlware/errorMiddleware")

dotenv.config();
app.use(express.json())
connectDb()

app.get("/",(req,res)=>{
    res.send("Homepage")
    console.log("Homepage")
})

app.use("/api/user",userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
app.use(notFound)
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.send("Homepage")
    console.log("Homepage")
})

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})