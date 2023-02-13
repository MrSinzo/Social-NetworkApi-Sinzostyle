
const { Schema, model, Types } = require("mongoose");
// const { Types } = require("mongoose");
const reactionSchema = new Schema({
  reactionId: {
    ofObjectId: [Schema.Types.ObjectId], // https://mongoosejs.com/docs/schematypes.html
  },
  reactionBody: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

thoughtSchema
  .virtual("reactionCount")
  .get(function () {
    let count = this.reactions.length;
    return count;
  })
  .set(function () {
    this.set({ count });
  });


const Thought = model("thought", thoughtSchema);
// const Thought = model.apply("thought", thoughtSchema);
module.exports = Thought
// module.exports = reactionSchema // if left uncommented, get error -> thought.deleteMany is not a function