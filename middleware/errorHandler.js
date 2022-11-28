const { error } =  require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json(error(errMsg, errStatus))
}

module.exports = errorHandler