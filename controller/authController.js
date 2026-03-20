
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


//Inscription
const registerUser = async (req, res) =>{
    try {
        const {username, email, image_profil, password } = req.body;

        const checkUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        console.log(checkUser);

        if(checkUser) return res.status(400).json({message : "this email or username is available"});

        const user = await User.create({username, email, image_profil, password});

        if(user){
            res.status(201).json({
                message: "user registered successfully",
                _id: user._id,
                username: user.username,
                token: generateToken(user._id)
            })
        }


    } catch (error) {
        console.log(error);

        // 🔥 Gestion spécifique Mongo duplicate key
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or username already used"
            });
        }

        res.status(500).json({
            message: "Erreur lors de l'inscription"
        });
    }
}

//connexion
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password)) ){
            res.json({
                message: "user login successfully",
                _id: user._id,
                username: user.username,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({message: 'Email ou mot de passe invalide'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "erreur los de la connexion"});
    }
}

module.exports = {
    registerUser,
    loginUser
};
