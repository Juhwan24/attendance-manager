// EXPRESS 앱 설정 파일
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const userRoutes = require('./routes/userRoutes');
const memberAttendanceRoutes = require('./attendance/user/{user_id}');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api', authRoutes);          
app.use('/api/attendance', attendanceRoutes);  
app.use('/api/meetings', meetingRoutes);  
app.use('/api/user', userRoutes); 
app.use('/api/memberAttendanceRoutes', memberAttendanceRoutes);         
     

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 글로벌 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
