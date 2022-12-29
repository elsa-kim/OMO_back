const express = require("express");
const router = express.Router();

// const diaryController = require('../../controllers/diary');
const placeController = require("../../controllers/place");
const scheduleController = require("../../controllers/schedule");
const checkAuth = require("../../middleware/auth");

// ## - NOT IN USE -
// -- DIARY --
// router.get('/diary/:diaryId', diaryController.getDiary);

// router.get('/diaries', diaryController.getDiaries);

// router.post('/diary', checkAuth, diaryController.postDiary);

// router.patch('/diary', checkAuth, diaryController.updateDiary);

// router.delete('/diary', checkAuth, diaryController.deleteDiary);

// -- 일정 --
router.get("/schedules", checkAuth, scheduleController.getSchedules);

router.post("/schedule", checkAuth, scheduleController.postSchedule);

router.patch("/schedule", checkAuth, scheduleController.updateSchedule);

router.delete("/schedule", checkAuth, scheduleController.deleteSchedule);

// — 가볼만한 곳 —
router.get("/place/:placeId", checkAuth, placeController.getSavedPlace);

router.get("/places", checkAuth, placeController.getSavedPlaces);

router.post("/place", checkAuth, placeController.postSavePlace);

router.delete("/place", checkAuth, placeController.deleteSavedPlace);

module.exports = router;
