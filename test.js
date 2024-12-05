/*
4. **회원별 출석 기록 조회 (`/api/attendance/user/{user_id}`)**
    - 설명: 동아리 회원의 개인 출석 기록을 조회하는 기능.
    - 요청 방식: `GET`
    - 요청 데이터: 사용자 ID
    - 응답 데이터: 해당 회원의 출석 기록 (모임명, 출석 날짜, 출석 여부)

사용자 정보조회에 넣어야 하나? 

*/
const UserMeeting = require('../models/userMeetingModel'); 
const Meeting = require('../models/meetingModel'); 

// Express 앱 생성
const app = express();
app.use(express.json());

app.get('/api/attendance/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      // 특정 회원의 출석 기록 조회
      const attendanceRecords = await UserMeeting.find({ user_id: userId }).populate('meeting_id', 'meeting_name date');
  
      if (!attendanceRecords.length) {
        return res.status(404).json({ message: 'No attendance records found for this user' });
      }
  
      const formattedRecords = attendanceRecords.map((record) => ({
        meetingName: record.meeting_id.meeting_name,
        date: record.meeting_id.date,
        status: record.status === 1 ? 'present' : 'absent',
      }));
  
      res.status(200).json({ userId, attendanceRecords: formattedRecords });
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  


