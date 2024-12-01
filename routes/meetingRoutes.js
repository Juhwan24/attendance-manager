const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');


router.post('/', meetingController.createMeeting);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);
router.get('/:id', meetingController.getMeeting);

module.exports = router;
