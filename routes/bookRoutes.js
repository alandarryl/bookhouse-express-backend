

const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

const {
        createBook,
        getAllBook,
        getOneBook,
        getUserBooks,
        updateBook,
        deleteBook
} = require('../controller/bookController');


//route to get all book

router.route('/All').get(getAllBook);

//route create a book
router.route("/create").post(protect, createBook);

//route get one book
router.route("/getOne/:id").get(getOneBook);

//route to update
router.route("/update/:id").put(protect, updateBook);

//route to delete
router.route("/delete/:id").delete(protect, deleteBook);

// Route pour le profil d'un utilisateur
router.get('/user/:userId',protect, getUserBooks);

module.exports = router;



