// MongoDB 연결 설정
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL); 
    console.log('MongoDB 연결됨');
  } catch (err) {
    console.error('MongoDB 연결 실패 :', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
