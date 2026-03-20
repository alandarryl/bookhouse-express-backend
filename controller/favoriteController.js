
const Favorite = requir('../models/Favorite.js');
const Book = require('../models/Book');

//add a book as favorite
const addFavorite = async (req,res) =>{
    try {
        //

        const checkBook = await Book.find(req.params.id);

        if (!checkBook) return res.status(404).json({message: "the book does not exist" });

        const newFavorite = new Favorite({
            user_id: req.user._id,
            id_annonce: req.params.id
        })

        const savedFavorite = await newFavorite.save();

        res.status(201).json({status: "like" });

    } catch (error) {
        //
        res.status(500).json({message: `Erreur serveur ${error.message}`})
    }
}

//delete a book as favorite
const deleteFavorite = async (req, res) =>{
    try {
        //

        const checkBook = await Book.find(req.params.id);
        const favoriteOwner = await Favorite.find({id_annonce: req.params.id});

        if (!checkBook) return res.status(404).json({message: "the book does not exist" });

    } catch (error) {
        //
        res.status(500).json({message: `Erreur serveur ${error.message}`})
    }
}


//seel all the book add as favorite ( of a specific use)
const getAllUserFavorite = async (req, res) =>{
    try {
        //
    } catch (error) {
        //
        res.status(500).json({message: `Erreur serveur ${error.message}`})
    }
}

module.exports = {
    addFavorite,
    deleteFavorite,
    getAllUserFavorite
}
