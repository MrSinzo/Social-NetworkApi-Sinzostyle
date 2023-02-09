const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    // ofObjectId: [Schema.Types.ObjectId], // https://mongoosejs.com/docs/schematypes.html
    type: Schema.Types.ObjectId, // from assignment.js mini proj. // line 120 of readme
    default : () => new Types.ObjectId()
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

module.exports = reactionSchema;