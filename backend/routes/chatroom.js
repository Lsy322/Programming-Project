var express = require('express');

var chatroomController = require('../controllers/chatroom.js')

const router = express.Router();

router.get('/getRooms/:user',chatroomController.getUserRoom);
router.get('/getRoomData/:roomId',chatroomController.getRoomData)
router.post('/createRoom',chatroomController.createRoom)
router.put('/addUser',chatroomController.addUserToRoom)
router.put('/sendMessage',chatroomController.addMessage)


module.exports = router;