const AsyncHandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");

const sendMessage= AsyncHandler(async(req,res)=>{
    const {content, chatId} = req.body
    if(!content|| ! chatId){
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    var newmessage = {
        sender:req.user._id,
        content : content,
        chat : chatId
    }
    try {
        var message = await Message.create(newmessage)

        message = await message.populate("sender","name picture")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path : "chat.users",
            select : "name picture email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage : message,
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


const allMessage  =AsyncHandler(async(req,res)=>{
    try {
        const message = await Message.find({chat:req.params.chatId})
        .populate("sender","name picture email")
        .populate("chat")
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports = {sendMessage,allMessage}