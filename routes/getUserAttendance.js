const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

// 회원별 출석 기록 조회
router.get('/:userId', attendanceController.getUserAttendanceRecords);

module.exports = router;
