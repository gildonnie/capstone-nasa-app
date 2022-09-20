const express = require('express');

const { getFavorites, addFavorite, deleteFavorite } = require('../controllers/favorites.js')


const router = express.Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:_id', deleteFavorite)

module.exports = router;