const { Book } = require("../models/index");

const handleServerError = (err, res) => {
  console.error(err.message);
  return res.status(500).json({ message: "Server error" });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    if (books.length === 0) {
      return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json(books);
  } catch (err) {
    return handleServerError(err, res);
  }
};

const createBook = async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name and score are required" });
    }

    const book = await Book.create({ name, score });

    return res.status(201).json(book);
  } catch (err) {
    return handleServerError(err, res);
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { name, score } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "Book id is required" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.name = name;
    book.score = score || book.score;

    await book.save();

    return res.status(200).json(book);
  } catch (err) {
    return handleServerError(err, res);
  }
};
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({ message: "Book id is required" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    return handleServerError(err, res);
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({ message: "Book id is required" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();

    return res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    return handleServerError(err, res);
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  getBookById,
  deleteBook,
};
