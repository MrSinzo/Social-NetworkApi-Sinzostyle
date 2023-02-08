const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const reactionSchema = new Schema({
  reactionId: {
    //ughhhhh
  },
  reactionBody: {
    type: String, 
    required: true,
    max_length: 280,
  },
  userName: {
    type: String, 
    required: true,
  },
    createdAt: {
     type: Date, 
     default: Date.now,
    }
})