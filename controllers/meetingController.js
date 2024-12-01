// 모임 관리 관련 API
const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');

// 모임 생성
exports.createMeeting = async (req, res) => {
  const { date, time, location, meetingName, organizerId, attendees } = req.body;

  // 필수 데이터 확인
  if (!date || !time || !location || !meetingName || !organizerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 참석자 ID 배열 확인 및 변환
    const validAttendees = await User.find({ _id: { $in: attendees || [] } }).select('_id');

    // Meeting 객체 생성
    const newMeeting = new Meeting({
      date,
      time,
      location,
      meeting_name: meetingName,
      organizer_id: organizerId,
      attendees: validAttendees.map((user) => user._id),
      total_users: validAttendees.length,
    });
    await newMeeting.save();

    res.status(201).json({ message: 'Meeting created successfully', meeting: newMeeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 모임 수정
exports.updateMeeting = async (req, res) => {
  const { id } = req.params;
  const { date, time, location, meetingName } = req.body;

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      { date, time, location, meeting_name: meetingName },
      { new: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 모임 삭제
exports.deleteMeeting = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 모임 정보 조회
exports.getMeeting = async (req, res) => {
  const { id } = req.params;

  try {
    const meeting = await Meeting.findById(id).populate('organizer_id', 'username email');
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};