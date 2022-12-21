const User = require("../../model/user");

exports.postSignIn = (req, res, next) => {
  // body에 email, password 받아옴
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({
      message: "email or password cannot be empty",
    });
  else res.status(200).send({ email, password });

  // TODO : DB 확인
  // TODO : encrypt(optional)
  // TODO : token 반환(쿠키)
};

exports.postSignUp = async (req, res, next) => {
  //  name, email, password
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "some fields are missing",
    });

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const error = new Error("이미 사용중인 이메일 입니다");
      error.statusCode = 401;
      throw error;
    } else res.send({ email });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
