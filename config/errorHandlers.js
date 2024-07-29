module.exports = (app) => {
  app.use(function (req, res, next) {
    res
      .status(404)
      .json({ error: "Not found", status: 404, url: req.originalUrl });
  });

  app.use((err, req, res, next) => {
    console.error(err);

    if (!err.isOperationnal) {
      if (process.env.NODE_ENV === "production") {
        return res
          .status(500)
          .json({ error: "Internal Server Error", status: 500 });
      } else {
        return res.status(500).json({ error: err.message, stack: err.stack });
      }
    }

    const statusCode = err.status || 500;
    const errorMessages = err.message || "Internal Server Error";

    return res.status(statusCode).json({
      error: errorMessages,
      status: statusCode,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  });
};
