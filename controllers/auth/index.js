const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

exports.postSignIn = async (req, res, next) => {
  // body에 email, password 받아옴
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "email or password cannot be empty",
    });

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      const error = new Error("Email not found");
      error.statusCode = 404;
      throw error;
    }
    const hashedPassword = foundUser.password;
    const isPasswordEqual = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEqual) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: foundUser.email,
        userId: foundUser._id.toString(),
      },
      process.env.TOKEN_SIGNATURE,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token,
      email: foundUser.email,
      name: foundUser.name,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.postSignUp = async (req, res, next) => {
  //  name, email, password
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({
      message: "some fields are missing",
    });

  // 비밀번호 암호화
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // 유저생성
    const result = await User.create({ email, password: hashedPassword, name });
    if (!result) {
      const error = new Error("some fields are missing");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({ message: "signup success" });
  } catch (error) {
    if (error.code === 11000) return res.status(403).json({ message: "duplicated" });
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
