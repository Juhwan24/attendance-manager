// 인증 관련 설정 (JWT, bcrypt .... )
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRATION: '1h',
  };
  