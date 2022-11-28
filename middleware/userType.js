const { error } = require("../utils/apiResponse");

const userType = (userType) => {
  return (req, res, next) => {
    try {
      if (req.userType !== userType)
        return res
          .status(401)
          .json(error("unauthorize to perform operation", res.statusCode));
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = userType;
