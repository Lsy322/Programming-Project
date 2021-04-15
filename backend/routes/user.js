var express = require('express');

var userController = require('../controllers/user.js')

const router = express.Router();


router.put('/create',userController.createUser);
router.get('/get',userController.getUser);
router.post('/sendRequest',userController.addFriendRequest);
router.delete('/removeRequest',userController.removeFriendRequest);
router.put('/acceptRequest',userController.acceptFriendRequest);

module.exports = router;