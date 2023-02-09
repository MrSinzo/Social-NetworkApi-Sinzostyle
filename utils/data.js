const rNames = ["Aaran", "Smith", "Zen", "Xander", "Courtney"];

const rEmails = [
  "Aaran@Email.com",
  "Smith@Email.com",
  "Zen@Email.com",
  "Xander@Email.com",
  "Courtney@Email.com",
];

const rThoughts = [
  "Joe Mama Big Momma",
  "Big Momma",
  "Hiplby hooo plah",
  "waka waka",
  "Gone Fishing",
  "Joe Mama Big Momma",
  "Joe Mama Gone Fishing",
  "Big Momma plah",
  "waka waka Big Momma plah",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// const getUserName = () => {

// }

const getRandomName = () => `${getRandomArrItem(rNames)}`;

const getRandomThoughts = () => `${getRandomArrItem(rThoughts)}`;

const getRandomEmails = () => `${getRandomArrItem(rEmails)}`;

// const getRandomThoughts = (int) => {
//   const res = [];
//   for (let i = 0; i < int; i++){
//     res.push({
//       thoughts: getRandomArrItem(rThoughts)
//     });
//   }
//   return res;
// }
module.exports = { getRandomName, getRandomThoughts, getRandomEmails };
// const getRandomBlogger = () => {
//   const results = []
//   for (let i = 0; i < 5; i++) {
//     results.push({
//       thought: getRandomArrItem(rThoughts),
//       username: getRandomArrItem(rNames),
//       email: getRandomArrItem(rEmail)
//     })
//   } 
// }
// module.exports = { getRandomBlogger}
