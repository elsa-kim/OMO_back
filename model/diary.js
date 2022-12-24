const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diary", diarySchema);
