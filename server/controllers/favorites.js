const { default: mongoose } = require('mongoose');
const favorite = require('../models/Favorite.js')

const getFavorites = async (req, res) => {
  try {
    const favorites = await favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const addFavorite = async (req, res) => {
  const nFavorite = req.body;
  const favorited = new favorite(nFavorite);
  try {
    await favorited.save();
    res.status(201).json(favorited);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const deleteFavorite = async (req, res) => {
  const { _id } = req.params;
  if( !mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No favorites with that id')
  };

  await favorite.findByIdAndRemove(_id);
  res.json({ message: 'Favorite Deleted'})

};

module.exports = { getFavorites, addFavorite, deleteFavorite};