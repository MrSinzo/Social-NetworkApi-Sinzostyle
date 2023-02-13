// const rNames = ["Aaran", "Smith", "Zen", "Xander", "Courtney", "Jason"]; // SEED DATA
const rNames = ["Aaran", "Smith", "Zen", "Xander", "Courtney"]

const rEmails = [
  "Aaran@Email.com",
  "Smith@Email.com",
  "Zen@Email.com",
  "Xander@Email.com",
  "Courtney@Email.com",
  // "Jason@Email.com"
]; // SEED DATA

const rThoughts = [
  "Joe Mama Big Momma",
  "Big Momma",
  "Hiplby hooo plah",
  "waka waka",
  "Gone Fishing",
  "Joe Mama Gone Fishing",
  "Big Momma plah",
  "waka waka Big Momma plah",
]; // SEED DATA

// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// these while loops will gather one piece of the array data, one at a time, in order, and will return results when the seed.js runs
let tcount = 0
const getThought = () => {
  // let i = 0;
  while (tcount < rThoughts.length) {
    console.log(rThoughts[tcount])
    rThoughts[tcount];
    tcount++;
    return rThoughts[tcount];
  }
};

let ncount = -1
const getName = () => {
  // let i = 0;
  while (ncount < rNames.length) {
    console.log(rNames[ncount]);
    // rNames[ncount];
    if (ncount === 4) {
      ncount = 0;
      rNames[ncount]
      return rNames[ncount]
    } else {
      rNames[ncount]
      ncount++;
      return rNames[ncount] 
    }
  }
};

let ecount = -1
const getEmail = () => {
  // let i = 0;
  while (ecount < rEmails.length) {
    console.log(rEmails[ecount])
    rEmails[ecount];
    ecount++;
    return rEmails[ecount];
  }
};



// const getFriends = () => {

// }


module.exports = { getName, getThought, getEmail };
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

// const getRandomThoughts = (int) => {
//   const res = [];
//   for (let i = 0; i < int; i++){
//     res.push({
//       thoughts: getRandomArrItem(rThoughts)
//     });
//   }
//   return res;
// }
