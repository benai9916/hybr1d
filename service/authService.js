const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../utils/apiResponse");
const prisma = new PrismaClient();

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json(error("please enter all fields", res.statusCode));
    const user = await prisma.auth.findFirst({
      where: { username: username },
      select: {
        id: true,
        userType: true,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json(error("User does not exists", res.statusCode));
    }
    // log user in
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(success("Successfully login", res.statusCode, user));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password, userType } = req.body;
    if (!username || !password || !userType)
      return res
        .status(400)
        .json(error("please enter all fields", res.statusCode));
    const user = await prisma.auth.findFirst({
      where: { username: username },
    });
    if (user) {
      return res.status(400).json(error("User already exists", res.statusCode));
    } else {
      const addUser = await prisma.auth.create({
        data: {
          username: username,
          password: password,
          userType: userType,
        },
        select: {
          id: true,
          userType: true,
        },
      });
      // log user in
      const token = jwt.sign(
        { id: addUser.id, username: "ben" },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(success("Successfully registered", res.statusCode, addUser));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    dd;
    res
      .clearCookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      })
      .json(success("Successfully logged out", res.statusCode));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signUp,
  logout,
};
