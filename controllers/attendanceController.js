//출석 체크 및 현황 조회
const UserMeeting = require('../models/userMeetingModel');
const Meeting = require('../models/meetingModel');

// 출석 체크
exports.markAttendance = async (req, res) => {
  const { userId, meetingId } = req.body;

  try {
    const existingAttendance = await UserMeeting.findOne({ user_id: userId, meeting_id: meetingId });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked' });
    }
    const newAttendance = new UserMeeting({ user_id: userId, meeting_id: meetingId, status: 1 });
    await newAttendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendanceStatus = async (req, res) => {
  const { meetingId } = req.params;
  try {
    const attendance = await UserMeeting.find({ meeting_id: meetingId }).populate('user_id', 'username email');
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
