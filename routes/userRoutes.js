const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

<<<<<<< Updated upstream
// 사용자 정보 조회
router.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
=======
router.get('/:id', userController.getUser);
>>>>>>> Stashed changes

module.exports = router;
