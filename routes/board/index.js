const express = require("express");
const router = express.Router();

const diaryController = require("../../controllers/diary");
const checkAuth = require("../../middleware/auth");

// -- DIARY --
// GET - single diary
router.get("/diary/:diaryId", diaryController.getDiary);

// GET - diaries
router.get("/diaries", diaryController.getDiaries);

// POST - single diary
router.post("/diary", checkAuth, diaryController.postDiary);

//  -- something else --

module.exports = router;
