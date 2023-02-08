const { connect, connection } = require("mongoose");

const connectionString = proces.env.MONGODB_URI;

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
