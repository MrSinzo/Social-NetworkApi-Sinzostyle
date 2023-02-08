const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connecteds')

  await User.deleteMany({});
  await Thought.deleteMany({});
  const users = [];

  for (let i = 0; i < 5; i++) {
    const thoughts = getRandomThoughts(1);

    const name = getRandomName();

    users.push({
      name, 
      thoughts
    });
  }
  User.collection.insertMany(users);
  console.table(users);
  console.info("Seeding Worked!!!!");
  process.exit(0)

});

