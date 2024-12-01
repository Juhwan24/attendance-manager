// 출석 체크 및 현황 조회 API 라우터
const express = require('express');
const router = express.Router();
const Meeting = require('../models/meetingModel');
const UserMeeting = require('../models/userMeetingModel');

// 출석 체크
router.post('/check', async (req, res) => {
  const { userId, meetingId } = req.body;
  try {
    const attendance = await UserMeeting.findOne({ user_id: userId, meeting_id: meetingId });
    if (attendance) {
      return res.status(400).json({ message: 'Already marked attendance' });
    }

    const newAttendance = new UserMeeting({ user_id: userId, meeting_id: meetingId, status: 1 });
    await newAttendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 모임 출석 현황 조회
router.get('/status/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  try {
    const attendanceStatus = await UserMeeting.find({ meeting_id: meetingId });
    res.status(200).json(attendanceStatus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
