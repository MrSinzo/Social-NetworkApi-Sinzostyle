// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const userSchema = require('./User');
const reactionSchema = require('./Reaction');
// const reactionSchema = new Schema({
//   reactionId: {
//     ofObjectId: [Schema.Types.ObjectId], // https://mongoosejs.com/docs/schematypes.html
//   },
//   reactionBody: {
//     type: String,
//     required: true,
//     min_length: 1,
//     max_length: 280,
//   },
//   userName: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

const thoughtSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId, // https://stackoverflow.com/questions/62290770/facing-throw-new-typeerrorinvalid-schema-configuration-name-is-not
    thoughtText: {
      type: String,
      required: true,
      unique: true,
      min_length: 1,
      max_length: 250,
    },
    createdAt: {
      type: Date, // think these are right
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactionCount: [{ reactionSchema }], // maybe? line 140 of readme
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

const Thought = model("thought", thoughtSchema);
// const Thought = model.apply("thought", thoughtSchema);
module.exports = Thought
