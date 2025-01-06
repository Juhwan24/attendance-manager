// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');


console.log("aaaaaa");

// 회원별 출석 기록 조회
router.get('/user/:userId', testController.getUserAttendanceRecords);

module.exports = router;
