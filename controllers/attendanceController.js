const UserMeeting = require('../models/userMeetingModel');
//user_id, meeting_id, status

const Meeting = require('../models/meetingModel');
//data, time, location, meeting_name, organizer_id, attendees, total_users
exports.markAttendance = async (req, res) => {
  const { userId, meetingId } = req.body;

  if (!userId || !meetingId) {
    return res.status(400).json({ message: 'User ID and Meeting ID are required' });
  }

  try {

    const existingAttendance = await UserMeeting.findOne({ user_id: userId, meeting_id: meetingId });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked' });
    }
    const newAttendance = new UserMeeting({ user_id: userId, meeting_id: meetingId, status: 1 });
    await newAttendance.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.getAttendanceStatus = async (req, res) => {
  const { meetingId } = req.params;

  if (!meetingId) {
    return res.status(400).json({ message: 'Meeting ID is required' });
  }

  try {
    const attendance = await UserMeeting.find({ meeting_id: meetingId }).populate('user_id', 'username email');
    if (!attendance.length) {
      return res.status(404).json({ message: 'No attendance records found for this meeting' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching attendance status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.qrcode = async (req, res) => {
  const { meeting_id } = req.body;

  try {
    const meeting = await Meeting.findById(meeting_id);
    if (!meeting) return res.status(404).send({ error: 'Meeting not found' });

    const qrData = `https://server-url/api/attendance/check?meeting_id=${meeting_id}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    meeting.qr_code = qrCodeImage;
    await meeting.save();

    res.status(201).send({
      message: 'QR code generated successfully',
      qr_code: qrCodeImage,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate QR code' });
  }
}

//출석률 통계 조회
/*
exports.statistics = async (req, res) => {
 return res.status(200).json({ user_id, meeting_id });
}
*/
