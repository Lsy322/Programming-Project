var express = require('express');

var userController = require('../controllers/user.js')

const router = express.Router();


router.get('/get',userController.getUser);
router.post('/sendRequest',userController.addFriendRequest);
router.delete('/removeRequest',userController.removeFriendRequest);
router.put('/acceptRequest',userController.acceptFriendRequest);
router.delete('/removeFriend',userController.removeFriend)

module.exports = router;