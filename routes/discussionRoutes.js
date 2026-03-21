
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createDiscussion, getUserDiscussions } = require('../controller/discussionController');

const router = express.Router();

// 🔹 Créer ou récupérer une discussion entre deux utilisateurs
router.post('/', protect, createDiscussion);

// 🔹 Récupérer toutes les discussions d'un utilisateur (avec lastMessage)
router.get('/my', protect, getUserDiscussions);

module.exports = router;

