
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Dans ton fichier de routes auth
const { protect } = require('../middleware/authMiddleware');

// Route pour récupérer les infos de l'utilisateur connecté via son cookie
router.get('/profile', protect, async (req, res) => {
    try {
        // req.user est déjà rempli par ton middleware protect (sans le password)
        if (!req.user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route de Déconnexion (pour détruire le cookie)
router.post('/logout', (req, res) => {
    res.clearCookie("token"); // Supprime le cookie nommé 'token'
    res.status(200).json({ message: "Déconnexion réussie" });
});

const registerUser = async (req, res) => {
    try {
        const { username, email, image_profil, password } = req.body;

        const checkUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (checkUser) {
            return res.status(400).json({
                message: "this email or username is available"
            });
        }

        const user = await User.create({ username, email, image_profil, password });

        if (user) {

            // SET COOKIE HERE
            res.cookie("token", generateToken(user._id), {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // THEN SEND RESPONSE
            res.status(201).json({
                message: "user registered successfully",
                _id: user._id,
                username: user.username
            });
        }

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or username already used"
            });
        }

        res.status(500).json({
            message: "Erreur lors de l'inscription"
        });
    }
};

//connexion
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {

            res.cookie("token", generateToken(user._id), {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                message: "user login successfully",
                _id: user._id,
                username: user.username
            });

        } else {
            res.status(401).json({ message: 'Email ou mot de passe invalide' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "erreur lors de la connexion" });
    }
};
module.exports = {
    registerUser,
    loginUser
};
