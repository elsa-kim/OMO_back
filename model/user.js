const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const savedPlaceSchema = new Schema(
  {
    placeId: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
      schedules: [{ type: scheduleSchema }],
      savedPlaces: [{ type: savedPlaceSchema }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
