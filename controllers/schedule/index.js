const User = require("../../model/user");

exports.getSchedules = async (req, res) => {
  const decodedUserId = req.userId;

  try {
    const foundUser = await User.findById(decodedUserId);
    res.status(200).json({
      schedules: foundUser.board.schedules,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postSchedule = async (req, res) => {
  const decodedUserId = req.userId;
  const { title, content, date } = req.body;

  try {
    const response = await User.findByIdAndUpdate(decodedUserId, {
      $push: { "board.schedules": { title, content, date } },
    });
    res.status(201).json({ message: "schedule saved", schedules: response.board.schedules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  const decodedUserId = req.userId;
  const { title, content, date, _id } = req.body;

  try {
    const foundUserAndSchedule = await User.updateOne(
      { _id: decodedUserId, "board.schedules._id": _id },
      {
        $set: {
          "board.schedules.$.title": title,
          "board.schedules.$.content": content,
          "board.schedules.$.date": date,
        },
      }
    );
    if (!foundUserAndSchedule) {
      const error = new Error("not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ message: "update success" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  const decodedUserId = req.userId;
  const { _id } = req.body;

  try {
    await User.findByIdAndUpdate(decodedUserId, {
      $pull: { "board.schedules": { _id } },
    });
    res.status(201).json({ message: "schedule deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
