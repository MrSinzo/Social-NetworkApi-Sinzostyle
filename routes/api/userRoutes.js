const router = require('express').Router();
const { 
  getUsers, // line 146
  getSingleUser, // line 148
  createUser, // line 150
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend
} = require('../../controllers/userController');

// api/user
router.route('/').get(getUsers).post(createUser)

// api/user/:userId
router.route("/:userId").get(getSingleUser).post(updateUser).delete(deleteUser);

///api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(newFriend).delete(deleteFriend)

module.exports = router;