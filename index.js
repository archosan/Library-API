const express = require("express");
const app = express();

require("./config/config");
require("./config/middleware")(app);

//routes
const userRoutes = require("./routes/user_routes");
const bookRoutes = require("./routes/book_routes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);

//error handlers
require("./config/errorHandlers")(app);

//listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
