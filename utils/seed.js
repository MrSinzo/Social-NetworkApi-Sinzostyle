const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmails  } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected')

  await User.deleteMany({});
  await Thought.deleteMany({});
  const users = [];

  for (let i = 0; i < 5; i++) {
    const name = getRandomName();
    const thought = getRandomThoughts();
    const email = getRandomEmails();

    users.push({
      name, 
      thought,
      email
    });
  }



  User.collection.insertMany(users);
  // Thought.collection.insertMany()
  console.table(users);
  console.log(users.thoughts)
  console.info("Seeding Worked!!!!");
  process.exit(0)

});

