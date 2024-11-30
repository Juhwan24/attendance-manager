const express = require('express');
const router = express.Router();
const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');  

// 모임 생성 API
router.post('/api/meetings', async (req, res) => {
  const { meeting_name, date, time, location, organizer_id, attendees } = req.body;
  try {
    if (!meeting_name || !date || !time || !location || !organizer_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 참석자 ID 배열을 ObjectId 배열로 변환
    const attendeeIds = await User.find({ _id: { $in: attendees } }).select('_id');
    const newMeeting = new Meeting({
      meeting_name,
      date,
      time,
      location,
      organizer_id,
      attendees: attendeeIds.map(user => user._id),
      total_users: attendeeIds.length,
    });

    await newMeeting.save();
    res.status(201).json({ message: 'Meeting created successfully', meeting: newMeeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
