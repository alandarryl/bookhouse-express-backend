

const Discussion = require('../models/Discussion');
const User = require('../models/User');

const createDiscussion = async (req, res) =>{
    try {
        const currentUserId = req.user._id;
        const {userId} = req.body;

        //empecher discussion avec soi meme
        if(currentUserId.toString() === userId){
            return res.status(400).json({
                message: "You cannot start a discussion with yourself"
            });
        }

        //cherche les discussion existante
        let discussion = await Discussion.findOne({
            participants: { $all: [currentUserId, userId] },
            $expr: { $eq: [{ $size: "$participants" }, 2] } // exactement 2 users
        }).populate('participants', 'username email');

        // si trouvée → retourner
        if (discussion) {
            return res.status(200).json(discussion);
        }

        // sinon → créer nouvelle discussion
        discussion = await Discussion.create({
            participants: [currentUserId, userId]
        });

        // populate pour réponse propre
        discussion = await discussion.populate('participants', 'username email');

        res.status(201).json(discussion);

    } catch (error) {
        return res.status(500).json({meesage: `erreur serveur ${error.message}`});
    }
}

//recuperer toutes les discussion d'un utilisateur
const getUserDiscussions = async (req, res) => {
    try {
        const userId = req.user._id;

        const discussions = await Discussion.find({
            participants: userId
        })
        .sort({ updatedAt: -1 }) // les plus récentes en premier
        .populate('participants', 'username email')
        .populate({
            path: 'lastMessage',
            populate: { path: 'sender', select: 'username email' }
        });

        res.status(200).json(discussions);

    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = {
    createDiscussion,
    getUserDiscussions
};
