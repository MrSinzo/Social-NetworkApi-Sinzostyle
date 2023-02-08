const rNames = [
  'Aaran',
  'Smith',
  'Zen',
  'Xander',
  'Courtney',
];

const rThoughts = [
  'Joe Mama',
  'Big Momma',
  'Hiplby ho plah',
  'waka waka',
  'Gone Fishing',
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(rNames)}`;

const getRandomThoughts = (int) => {
  const res = [];
  for (let i = 0; i < int; i++){
    res.push({
      thoughts: getRandomArrItem(rThoughts)
    });
  }
  return res;
}

module.exports = { getRandomName, getRandomThoughts}