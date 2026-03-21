
const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    participants: 
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            require: true
        }
    ,
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    
}, {timestamps: true});

//eviter duplication
discussionSchema.index({participants: 1});

module.exports = mongoose.model("Discussion", discussionSchema);
