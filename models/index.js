const User = require("../models/User");
const Book = require("../models/Book");
const Loan = require("../models/Loan");

User.hasMany(Loan, { foreignKey: "userId" });
Loan.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

module.exports = {
  User,
  Book,
  Loan,
};
