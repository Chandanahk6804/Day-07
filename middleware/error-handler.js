const CustomError = require("../utils/error-class");

const errorHandler = (err, req, res, next) => {
  console.error(err); // log once

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      error: err.name,
      message: err.message
    });
  }

  // Fallback (unknown error)
  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Something went wrong"
  });
};

module.exports = errorHandler;