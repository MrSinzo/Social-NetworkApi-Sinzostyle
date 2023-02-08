const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
  {
    userName: {
      type:String,
      required: true,
      unique: true,
      trim: true // may not be right
    },
    email : {
      type: String,
      required: true,
      unique: true,
    },
    thoughts : [thoughtSchema], // line 82
    friends : [userSchema], //line 84
  },
{
  toJSON: {
    virtual: true
  }
}
);

const User = model.apply('user', userSchema);

module.exports = User;