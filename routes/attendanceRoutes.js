// 출석 체크 및 현황 조회 API 라우터
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/check', attendanceController.markAttendance);
router.get('/status/:meetingId', attendanceController.getAttendanceStatus);

module.exports = router;
