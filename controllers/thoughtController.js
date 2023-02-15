const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  getThoughts(req, res) {
    Thought.find() // finds all users in database
      // if promise comes back good, we name the incoming data object as users and respond from the server with a json file consisting of users
      .then((thoughts) => res.json(thoughts))
      // if promise does not come back, we get error.
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(async (thought) =>
        thought
          ? res.json({
              thought,
            })
          : res.status(404).json({ message: "Didnt work" })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "thought created, but no user with this ID" })
          : res.json({ message: "thought created" })
      )
      .catch((err) => {
        console.error(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : User.findOneAndUpdate(
              { users: req.params.userId }, // may need to look at this more closely
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((users) =>
        !users
          ? res.status(404).json({
              message: "User deleted, but no Thoughts found",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $set: { thoughtText: req.body.thoughtText } }, // was $addtoset
      { runValidators: true, new: false } // might need to be true
    ).then((newText) =>
      !newText
        ? res
            .status(404)
            .json({ message: "Cannot update: User has no ID to update" })
        : res.json(newText)
    );
  },
  newReaction(req, res) {
    console.log(req.body)
    // console.log(req.body.reactionBody)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, 
      // putting reactions in array doesnt work [reactions]

      { new: true } // might need to be true if nothing is showing up
    ).then((thought) =>
    thought
        ? res.json(thought)
        : res.status(404).json({ message: "Reaction failed to commit" })
    );
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionsId: req.params.reactionsId } } }, // may need to be _id or req.body 
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Reaction ID does not exist' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
