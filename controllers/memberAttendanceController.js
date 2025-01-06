/*
4.회원별 출석 기록 조회
*/
const UserMeeting = require('../models/userMeetingModel');
const Meeting = require('../models/meetingModel');

exports.getUserAttendanceRecords = async (req, res) => {
  const { userId } = req.params;

  console.log("dddddd");

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // 특정 회원의 출석 기록 조회
    const attendanceRecords = await UserMeeting.find({ user_id: userId }).populate('meeting_id', 'meeting_name date');

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this user' });
    }

    // 응답 데이터를 필요한 형식으로 변환
    const formattedRecords = attendanceRecords.map((record) => ({
      meetingName: record.meeting_id.meeting_name,
      date: record.meeting_id.date,
      status: record.status === 1 ? 'present' : 'absent',
    }));

    res.status(200).json({ userId, attendanceRecords: formattedRecords });
  } catch (error) {
    console.error('Error fetching user attendance records:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
