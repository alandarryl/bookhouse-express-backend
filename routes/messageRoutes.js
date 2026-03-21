const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, getMessagesByDiscussion } = require('../controller/messageController');
const router = express.Router();

// envoyer un message
router.post('/send', protect, sendMessage);

// récupérer tous les messages d'une discussion
router.get('/:discussionId', protect, getMessagesByDiscussion);

module.exports = router;