const AsyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");

const accessChat = AsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not send with request");
        return res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    }).populate("users", "-password").populate("latestMessage")
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name picture email"
    })
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            charName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password")
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
    }
})

const fetchChat = AsyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name picture email"
                })
                res.status(200).send(results)
            })
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
})

const ceateGroup = AsyncHandler(async (req, res) => {
    if (!req.body.users || !res.body.name) {
        return res.status(400).send({ messgae: "Please fill all the fields" })
    }
    var users = JSON.parse(req.body.users);

    if (users.lenght < 2) {
        return res.status(400)
            .send("More then 2 users required to form a group chat")
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const FullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(FullGroupChat)

    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
})

const renameGroup = AsyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    const updateChat = await Chat.findByIdAndUpdate(charId, {
        chatName: chatName
    },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!updateChat) {
        res.status(404);
        throw new Error("Chat Not Found")
    }
    else {
        res.json(updateChat)
    }
})

const addtoGroup = AsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId }
    }, {
        new: true
    }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found")
    }
    else {
        res.json(added)
    }
})
const removefromGroup = AsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const remove = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
    }, {
        new: true
    }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!remove) {
        res.status(404);
        throw new Error("Chat Not Found")
    }
    else {
        res.json(remove)
    }
})

module.exports = { accessChat, fetchChat, ceateGroup, renameGroup, addtoGroup, removefromGroup }