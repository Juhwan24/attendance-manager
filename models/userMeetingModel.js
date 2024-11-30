const mongoose = require('mongoose');

const userMeetingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meeting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  status: { type: Number, default: 0 }, // 출석 여부
});

module.exports = mongoose.model('UserMeeting', userMeetingSchema);
