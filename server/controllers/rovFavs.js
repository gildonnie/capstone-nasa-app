const { default: mongoose } = require('mongoose');
const RoverFav = require('../models/RoverFav.js')

const getRovFavorites = async (req, res) => {
  try {
    const favorites = await RoverFav.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const addRovFavorite = async (req, res) => {
  const nFavorite = req.body;
  const favorited = new RoverFav(nFavorite);
  try {
    await favorited.save();
    res.status(201).json(favorited);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const deleteRovFavorite = async (req, res) => {
  const { _id } = req.params;
  if( !mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No favorites with that id')
  };

  await RoverFav.findByIdAndRemove(_id);
  res.json({ message: 'Favorite Deleted'})

};

module.exports = { getRovFavorites, addRovFavorite, deleteRovFavorite };