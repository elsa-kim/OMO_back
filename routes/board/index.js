const express = require("express");
const router = express.Router();

const diaryController = require("../../controllers/diary");
const placeController = require("../../controllers/place");
const checkAuth = require("../../middleware/auth");

// -- DIARY --
// GET - single diary
router.get("/diary/:diaryId", diaryController.getDiary);

// GET - diaries
router.get("/diaries", diaryController.getDiaries);

// POST - single diary
router.post("/diary", checkAuth, diaryController.postDiary);

router.patch("/diary", checkAuth, diaryController.updateDiary);

router.delete("/diary", checkAuth, diaryController.deleteDiary);

// -- 가볼만한 곳 --
router.get("/place/:placeId", checkAuth, placeController.getSavedPlace);

router.get("/places", checkAuth, placeController.getSavedPlaces);

router.post("/place", checkAuth, placeController.postSavePlace);

router.delete("/place", checkAuth, placeController.deleteSavedPlace);

module.exports = router;
