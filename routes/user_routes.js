const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  borrowBook,
  returnBook,
} = require("../controllers/user_controller.js");
const {
  registerValidationSchema,
  idValidationSchema,
  borrowValidationSchema,
  returnBookValidationSchema,
} = require("../validators/index");
const { validateBody, validateParams } = require("../middlewares/index.js");

router.get("/", getAllUsers);

router.get("/:id", validateParams(idValidationSchema), getUserById);

router.post("/", validateBody(registerValidationSchema), createUser);
router.put(
  "/:id",
  validateParams(idValidationSchema),
  validateBody(registerValidationSchema),
  updateUser
);
router.delete("/:id", validateParams(idValidationSchema), deleteUser);

router.post(
  "/:id/borrow/:bookid",
  validateParams(borrowValidationSchema),
  borrowBook
);
router.put(
  "/:id/return/:loanid",
  validateParams(returnBookValidationSchema),
  returnBook
);

module.exports = router;
