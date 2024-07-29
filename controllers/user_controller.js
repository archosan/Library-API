const { User, Loan, Book } = require("../models/index");

const handleError = (err, res, statusCode = 500) => {
  console.error(err.message);
  res.status(statusCode).json({ message: err.message || "Server error" });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }

    const userWithLoans = await User.findByPk(userId, {
      include: [
        {
          model: Loan,
          include: [Book],
        },
      ],
    });
    if (!userWithLoans) {
      return res.status(404).json({ message: "User not found" });
    }

    const books = [(past = []), (present = [])];

    userWithLoans.Loans.forEach((loan) => {
      const bookInfo = {
        id: loan.Book.id,
        name: loan.Book.name,
        score: loan.Book.score,
      };

      if (loan.returnDate) {
        books[0].push(bookInfo);
      } else {
        books[1].push(bookInfo);
      }
    });

    const responseData = {
      user: {
        id: userWithLoans.id,
        name: userWithLoans.name,
        books,
      },
    };

    return res.status(200).json(responseData);
  } catch (err) {
    handleError(err, res);
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const loans = await Loan.findAll({
      where: { userId, returnDate: null },
    });

    if (loans.length > 0) {
      return res.status(400).json({
        message: "User has books that not returned. You can not delete user",
      });
    }

    await user.destroy();

    return res.status(204).json("User deleted successfully");
  } catch (err) {
    handleError(err, res);
  }
};

const borrowBook = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.params.bookid;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User id and book id are required" });
    }

    const loan = await Loan.findOne({
      where: { bookId, returnDate: null },
    });

    if (loan) {
      return res
        .status(400)
        .json({ message: "Someone already borrowed this book" });
    }

    const newLoan = await Loan.create({ userId, bookId, loanDate: new Date() });

    return res.status(201).json(newLoan);
  } catch (err) {
    handleError(err, res);
  }
};

const returnBook = async (req, res) => {
  try {
    const loanId = req.params.id;
    const userId = req.params.id;
    if (!loanId) {
      return res.status(400).json({ message: "Loan id is required" });
    }

    const loan = await Loan.findByPk(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.userId !== userId) {
      return res.status(400).json({
        message:
          "You can not return this book, because you dont borrow this book",
      });
    }

    if (loan.returnDate) {
      return res.status(400).json({ message: "Book already returned" });
    }

    loan.returnDate = new Date();
    await loan.save();

    return res.status(200).json(loan);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  borrowBook,
  returnBook,
};
