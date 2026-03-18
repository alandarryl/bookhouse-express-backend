

const Book = require('../models/Book');

//create a book 
const createBook = async (req,res) =>{
    try {
        const {titre, description, annonce_image, date_publication, auteur, nb_exemplaire, id_user} = req.body;

        // Validation simple
        if (!titre || !description || !auteur || !id_user) {
            return res.status(400).json({ message: "Merci de remplir tous les champs obligatoires (titre, desc, auteur, id_user)" });
        }

        const newBook = new Book({
            titre,
            description,
            annonce_image,
            auteur,
            nb_exemplaire,
            id_user // L'ID de l'utilisateur qui poste l'annonce
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (error) {
        console.log({message: error.message});
        res.status(500).json({message: "Erreur serveur"});
    }
}


//get all book 
const getAllBook = async (req, res) =>{
    try {
        const books = await Book.find()

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({message: "Erreur serveur"});
    }
}


//get one book
const getOneBook = async (req,res) =>{
    try{

        const book = await Book.findById(req.params.id).populate('id_user', 'pseudo email');

        if (!book) {
            return res.status(404).json({ message: "Le livre n'a pas été trouvé" });
        }

        res.status(200).json(book);

    }catch(error){
        res.status(500).json({message: "Erreur serveur"});
    }
}

//delet one book (only allow by the user)


//update one book (only the user can do that)


//get all book publish by one user


//order by the recent one


//modify only one info with put


module.exports = {
    createBook,
    getAllBook,
    getOneBook
};
