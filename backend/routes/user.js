var express = require('express');

var userController = require('../controllers/user.js')

const router = express.Router();


router.get('/:id',userController.getUser);
router.post('/sendRequest',userController.addFriendRequest);
router.delete('/removeFriend',userController.removeFriend)
router.delete('/removeRequest',userController.removeFriendRequest);
router.put('/acceptRequest',userController.acceptFriendRequest);
router.delete('/delete/:id',userController.deleteUser)
router.get('/friends/:id',userController.getFriends)
router.get('/friendRequest/:id',userController.getFriendRequest)

module.exports = router;