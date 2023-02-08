const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type:String,
      required: true,
      unique: true,
      min_length: 1,
      max_length: 250
    },
    createdAt : {
      type: Date,  // think these are right
      default: Date.now ,
    },
    userName: {
        type: String,
        required: true,
    },
    reactionCount: [reactionSchema]
  });

const User = model.apply('user', userSchema);

module.exports = User;