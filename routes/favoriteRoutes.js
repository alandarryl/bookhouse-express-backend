

const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

const {
    addFavorite,
    deleteFavorite,
    getAllUserFavorite
} = require('../controller/favoriteController');


//like a book
router.route('/like/:id').post(protect, addFavorite);

//unlike a book
router.route('/unlike/:id').delete(protect, deleteFavorite);

//see all user favorite
router.route('/my-favorite').get(protect, getAllUserFavorite);

module.exports = router;


