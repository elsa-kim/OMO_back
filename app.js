const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routes/auth");
const checkAuth = require("./middleware/auth");
const boardRouter = require("./routes/board");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// 라우터
app.use("/auth", authRouter);
app.use("/board", boardRouter);

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.set("strictQuery", true);
mongoose
  .connect(URI, { dbName: "omo", useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`로그인 서버가 ${PORT}번에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.log("connect failed: ", err);
  });
