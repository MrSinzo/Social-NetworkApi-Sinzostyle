const express = require('express'); // connection to express
const db = require('./config/connection'); // connetion to the database
const routes = require('./routes'); // connection to the routes
// route connection not going here line 140?
// const cwd = process.cwd(); // Current Working Directory? // play with this later

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`http://localhost/3001 Api for the Social Network Api !`);
  });
});