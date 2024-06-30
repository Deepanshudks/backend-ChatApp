const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000
const { notFound, errorHandler } = require("./middlware/errorMiddleware")

dotenv.config();
app.use(express.json())
connectDb()

app.get("/", (req, res) => {
    res.send("Homepage")
    console.log("Homepage")
})

app.use("/api/user", userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound)
app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("Homepage")
    console.log("Homepage")
})

const server = app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})
const io = require("socket.io")(server,{
    pingTimeout: 60000,
    cors: {

        origin : " http://localhost:3000"
    }
})
io.on("connection",(socket)=>{
    console.log("Connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        socket.emit('connected');
    })
    socket.on('join chat',(room)=>{
        socket.join(room)
        socket.emit('connected');
    })

    socket.on('new message',(newMessageRecieved)=>{
        var Chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.user is not defined");

        chat.users.forEach((user) => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved",newMessageRecieved)
        });
    });
    socket.off('setup',()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    })
})