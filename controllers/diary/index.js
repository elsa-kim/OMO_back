const Diary = require("../../model/diary");
const User = require("../../model/user");

exports.getDiary = async (req, res, next) => {
  const { diaryId } = req.params;

  try {
    const foundDiary = await Diary.findById(diaryId, {
      __v: 0,
      _id: 0,
    });
    if (!foundDiary) {
      const error = new Error("no diary found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "found diary",
      diary: foundDiary,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getDiaries = async (req, res, next) => {
  try {
    const diaries = await Diary.find(
      {},
      {
        __v: 0,
        creator: 0,
      }
    );
    res.status(200).json({
      message: "all diaries",
      diaries,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postDiary = async (req, res, next) => {
  const { title, content, name } = req.body;
  console.log({ title, content, name });
  const decodedUserId = req.userId;

  if (!title || !content || !name) return res.status(400).json({ message: "some fields are missing" });

  const diary = new Diary({
    creator: decodedUserId,
    title,
    content,
    name,
  });
  try {
    await diary.save();
    const foundUser = await User.findById(decodedUserId);

    foundUser.board.diaries.push(diary);
    await foundUser.save();

    res.status(201).json({
      message: "diary created!",
      diary: {
        _id: diary._id,
        name: diary.name,
        title: diary.title,
        content: diary.content,
        createdAt: diary.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
