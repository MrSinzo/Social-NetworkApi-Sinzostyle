
const { Schema, model } = require("mongoose");
// const { Types } = require("mongoose");
const reactionSchema = new Schema({
  
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
    get: (date)=> date.toLocaleDateString("en-US"),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

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
      type: Date, // think these are right // while this does apply a date, it is not in the format for criteria, gotta fix that with
      default: Date.now,
      get: (date)=> date.toLocaleDateString("en-US"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
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

//  function createdDate () {} // getter wont allow me to just use a funtion repeatedly so gonna have to copy pasta once i get thought date right

  //getter?
// thoughtSchema.get( function () {

// } )

const Thought = model("thought", thoughtSchema);
// const Thought = model.apply("thought", thoughtSchema);
module.exports = Thought
// module.exports = reactionSchema // if left uncommented, get error -> thought.deleteMany is not a function