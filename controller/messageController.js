
const Message = require('../models/Message');
const Discussion = require('../models/Discussion');


const sendMessage = async (req, res) =>{
    try {
        const senderId = req.user._id;
        const {DiscussionId, content} = req.body;

        if(!DiscussionId || !content){
            return res.status(400).json({
                message : "Discussion ID and content are necessary"
            });
        }

        //check if discussion exist
        let discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        // vérifier que l'user fait partie de la discussion
        if (!discussion.participants.includes(senderId)) {
            return res.status(403).json({ message: "You are not a participant of this discussion" });
        }

        //créer le message
        const message = await Message.create({
            discussion: discussionId,
            sender: senderId,
            content
        });

        //mettre à jour lastMessage de la discussion
        discussion.lastMessage = message._id;
        await discussion.save();

        //populate pour la réponse
        const populatedMessage = await message.populate('sender', 'username email');

        res.status(201).json(populatedMessage);


    } catch (error) {
        return res.status(500).json({message: `erreur de serveur ${error.message}` });
    }
}

const getMessagesByDiscussion = async (req, res) => {
    try {
        const userId = req.user._id;
        const { discussionId } = req.params;

        if (!discussionId) {
            return res.status(400).json({ message: "Discussion ID is required" });
        }

        //vérifier que la discussion existe
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        //vérifier que l'user fait partie de la discussion
        if (!discussion.participants.includes(userId)) {
            return res.status(403).json({ message: "You are not a participant of this discussion" });
        }

        //récupérer tous les messages
        const messages = await Message.find({ discussion: discussionId })
            .sort({ createdAt: 1 }) // tri par ordre chronologique
            .populate('sender', 'username email');

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = { 
    sendMessage,
    getMessagesByDiscussion
};
