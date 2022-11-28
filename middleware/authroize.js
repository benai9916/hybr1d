const jwt = require("jsonwebtoken");
const { error } = require("../utils/apiResponse");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    const token = String(req.cookies.token).trim();
    if (!token)
      return res.status(401).json(error("unauthorized", res.statusCode));
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prisma.auth.findFirst({
      where: { id: verify.id },
    });
    if (user) {
      req.id = user.id;
      req.userType = user.userType;
      next();
    } else {
      return res.status(401).json(error("unauthorized", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = auth;
