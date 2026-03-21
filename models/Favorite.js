const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
},{timestamps: true});

//prevent duplicate
favoriteSchema.index({user_id: 1, book_id: 1}, {unique: true});

module.exports = mongoose.model("Favorite", favoriteSchema);
