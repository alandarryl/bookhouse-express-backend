

const express = require('express');

const router = express.Router();

const {getAllBook, getOneBook, createBook} = require('../controller/bookController');


//route to get all book

router.route('/All').get(getAllBook);

//route create a book
router.route("/create").post(createBook);

//route get one book
router.route("/getOne/:id").get(getOneBook);


module.exports = router



