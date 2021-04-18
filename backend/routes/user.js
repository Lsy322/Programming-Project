var express = require('express');

var userController = require('../controllers/user.js')

const router = express.Router();


router.get('/get/:id',userController.getUser);
router.post('/sendRequest',userController.addFriendRequest);
router.delete('/removeRequest',userController.removeFriendRequest);
router.put('/acceptRequest',userController.acceptFriendRequest);
router.delete('/removeFriend',userController.removeFriend)
router.delete('/delete/:id',userController.deleteUser)

module.exports = router;