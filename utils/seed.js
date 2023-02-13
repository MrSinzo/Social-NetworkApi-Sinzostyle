const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getName, getThought, getEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected')

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  for (let i = 0; i < 5; i++) {
    const username = getName();
    const email = getEmail();
    users.push({
      username, 
      email,
    });
  }

  
  const thoughts = []
  for (let i = 0; i < 5; i++) {
    const thoughtText = getThought();
    const username = getName();
    thoughts.push({
      username,
      thoughtText
    });
  }  
console.log("test**************************************")
  
  // const userThoughts
  // maybe need a create for thoughts?
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts)
  console.table(users);
  console.table(thoughts)
  console.info("Seeding Worked!!!!");
  process.exit(0)

});

