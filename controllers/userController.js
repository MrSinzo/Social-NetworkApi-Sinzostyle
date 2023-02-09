const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models"); // dont need reaction beacuse it is a subdocument? ( virtual?)

// functions?
module.exports = {
  getUsers(req, res) {
    User.find() // finds all users in database
      // if promise comes back good, we name the incoming data object as users and respond from the server with a json file consisting of users
      .then((users) => res.json(users))
      // if promise does not come back, we get error.
      .catch((err) => res.status(500).json(err)) 
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        user
          ? res.json({
              user,
              thoughts: await thoughts(req.params.userId),
              reactions: await reactions(req.params.userId),
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
      username: req.body,
      email: req.body
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  }
};
