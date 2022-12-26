const Diary = require("../../model/diary");

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

    res.status(201).json({
      message: "diary created!",
      diary: {
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

exports.updateDiary = async (req, res) => {
  const { title, content, name, diaryId } = req.body;
  const decodedUserId = req.userId;

  try {
    const foundDiary = await Diary.findOneAndUpdate({ _id: diaryId, creator: decodedUserId }, { title, content, name });
    if (!foundDiary) {
      const error = new Error("no diary found");
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({
      message: "update success",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteDiary = async (req, res) => {
  const { diaryId } = req.body;
  const decodedUserId = req.userId;

  try {
    const deletedDiary = await Diary.findOneAndDelete({ _id: diaryId, creator: decodedUserId });
    if (!deletedDiary) {
      const error = new Error("no diary found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({
      message: "delete success",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
