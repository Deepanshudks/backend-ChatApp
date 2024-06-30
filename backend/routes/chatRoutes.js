const express = require('express');
const protect = require('../middlware/authMiddleware');
const { accessChat, fetchChat, ceateGroup, renameGroup, addtoGroup, removefromGroup } = require('../controllers/chatController');

const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChat);
router.route('/group').post(protect,ceateGroup);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removefromGroup);
router.route('/groupadd').put(protect,addtoGroup);

module.exports = router