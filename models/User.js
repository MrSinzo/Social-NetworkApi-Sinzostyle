const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const Thought = require("./Thought");
// const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId, //https://stackoverflow.com/questions/62290770/facing-throw-new-typeerrorinvalid-schema-configuration-name-is-not
    username: {
      type: String,
      required: true,
      unique: true,
      // trim: true, // may not be right
      // dropDups: true // doesnt drop duplicates as intended
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // dropDups: true
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }], // line 82 of Readme
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], //line 84 of Readme
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

const User = mongoose.model("user", userSchema);
// const User = model.apply("user", userSchema);

module.exports = User;
