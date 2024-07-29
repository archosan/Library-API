const router = require("express").Router();
const {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  getBookById,
} = require("../controllers/book_controller");
const {
  bookRegisterSchema,
  idValidationSchema,
} = require("../validators/index");
const { validateBody, validateParams } = require("../middlewares/index");

router.get("/", getAllBooks);
router.post("/", validateBody(bookRegisterSchema), createBook);
router.delete("/:id", validateParams(idValidationSchema), deleteBook);
router.put("/:id", validateParams(idValidationSchema), updateBook);
router.get("/:id", validateParams(idValidationSchema), getBookById);

module.exports = router;
