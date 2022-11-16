const express = require('express');

const { getRovFavorites, addRovFavorite, deleteRovFavorite } = require('../controllers/rovFavs.js')


const router = express.Router();

router.get('/', getRovFavorites);
router.post('/', addRovFavorite);
router.delete('/:_id', deleteRovFavorite)

module.exports = router;