const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models"); // dont need reaction beacuse it is a subdocument? ( virtual?)


// this will get a total of how many friends a specific user has
const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
  // gets all users
  getUsers(req, res) {
    User.find() // finds all users in database
      // if promise comes back good, we name the incoming data object as users and respond from the server with a json file consisting of users
      .then((users) => res.json(users))
      // if promise does not come back, we get error.
      .catch((err) => res.status(500).json(err)); 
  },
  // gets single users
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        user
          ? res.json({
              user,
              thoughts: {}, //used an empty object here to make sure the object was being imported correctly(if i remember right)
              friendCount: await friendCount(),
            })
          : res.status(404).json({ message: "No user with that ID" })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // creates a new user
  createUser(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // deletes specific user by Id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no Thoughts found",
            })
          : res.json({ message: "USer successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // adds a friend to a users friend list by Id
  newFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: false }
    )
      .then((newFriend) =>
        newFriend
          ? res.json({ message: "friend was succesfully added" })
          : res.status(404).json({ message: "error in adding friend" })
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    //deletes a specific friend by Id from specific user Id
    User.findOneAndUpdate({ userId: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : User.updateOne({$pull: {friends: req.params.friendId}}
          )
      ).then(() => res.json({message: "Friend Deleted"}))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    // update a user email 
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $set: { email: req.body.email } }, // was $addtoset
      { runValidators: true, new: false } 
    ).then((newUserId) =>
      !newUserId
        ? res
            .status(404)
            .json({ message: "Cannot update: Cannot find User to update" })
        : res.json(newUserId)
    );
  },
};
