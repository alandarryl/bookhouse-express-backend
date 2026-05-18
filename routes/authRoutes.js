const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes privées (déplacées ici !)
router.get('/profile', protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Déconnexion réussie" });
});

module.exports = router;
