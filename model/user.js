const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    board: {
      diaries: [
        {
          type: Schema.Types.ObjectId,
          ref: "Diary",
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
