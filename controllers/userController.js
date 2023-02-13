const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models"); // dont need reaction beacuse it is a subdocument? ( virtual?)

// functions?

const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

// const findUsersThoughts = async (userId) =>
//   Thought.aggregate([
//     { $match: { username: req.body.username } },
//     { $unwind: "thoughts" },
//     {
//       group: {
//         _id: ObjectId(userId),
//         // thoughts:
//       },
//     },
//   ]);

module.exports = {
  getUsers(req, res) {
    User.find() // finds all users in database
      // if promise comes back good, we name the incoming data object as users and respond from the server with a json file consisting of users
      .then((users) => res.json(users))
      // if promise does not come back, we get error.
      .catch((err) => res.status(500).json(err)); // mostly works
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        user
          ? res.json({
              user,
              thoughts: {}, // something wrong with this
              friendCount: await friendCount(),
            })
          : res.status(404).json({ message: "No user with that ID" })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create({
      username: req.body.username, //turned these into objects?
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId }, // may need to look at this more closely
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
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $set: { email: req.body.email } }, // was $addtoset
      { runValidators: true, new: false } // might need to be true
    ).then((newUserId) =>
      !newUserId
        ? res
            .status(404)
            .json({ message: "Cannot update: User has no ID to update" })
        : res.json(newUserId)
    );
  },
};
