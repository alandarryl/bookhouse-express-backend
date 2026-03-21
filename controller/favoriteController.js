
const Favorite = require('../models/Favorite.js');
const Book = require('../models/Book');

//add a book as favorite
const addFavorite = async (req,res) =>{
    try {
        //

        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({message: "book not found" });



        //check if already favorite
        const existingFavorite = await Favorite.findOne({
            user_id: req.user._id,
            book_id: req.params.id
        });

        if(existingFavorite){
            return res.status(200).json({message: "Already favorite" });
        }


        const newFavorite = await Favorite.create({
            user_id: req.user._id,
            book_id: req.params.id
        })


        res.status(201).json({status: "liked", data: newFavorite });

    } catch (error) {
        //
        res.status(500).json({message: `Erreur serveur ${error.message}`})
    }
}

//delete a book as favorite
const deleteFavorite = async (req, res) =>{
    try {
        //

        const favorite = await Favorite.findOneAndDelete({
            book_id: req.params.id,
            user_id: req.user._id
        });

        if(!favorite){
            return res.status(404).json({
                message: "Favorite not found"
            });
        }

        res.status(200).json({status: "unliked"});

    } catch (error) {
        //
        res.status(500).json({message: `Erreur serveur ${error.message}`})
    }
}


//seel all the book add as favorite ( of a specific use)
const getAllUserFavorite = async (req, res) =>{
    try {
        //

        const allFavorites = await Favorite.find({
            user_id: req.user._id
        }).populate('book_id');

        res.status(200).json(allFavorites);

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
