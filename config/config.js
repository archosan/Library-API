const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    connectionString: process.env.DATABASE_URL,
  },
};
