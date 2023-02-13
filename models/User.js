// const mongoose = require("mongoose");
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
      trim: true, // may not be right
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(),
      },
    },
    // line 82 of Readme
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought", // changed from uppsercase // changed from not plural to plural
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user", // changed from uppsercase
      },
    ], //line 84 of Readme
  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  }
  // {typeKey: '$type'} // By adding this we are asking mongoose to use $type for interpreting the type of a key instead of the default keyword type //https://stackoverflow.com/questions/33846939/mongoose-schema-error-cast-to-string-failed-for-value-when-pushing-object-to
);

userSchema.virtual("friendCount").get(function () {
  if (this.friends.length === null) {
    // let count = this.friends.length;
    let count = 0;
    console.log(count);
    return count;
  } else {
    return this.friends.length;
  }
});
// .set(function () {
//   this.set(`${count}`);
// });

const User = model("user", userSchema);
// const User = model.apply("user", userSchema);
// console.table([userSchema])
module.exports = User;
