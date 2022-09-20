const { Schema, model } = require('mongoose');


const favSchema = new Schema ({
  date: {
    type: Object,
  },
  title: {
    type: Object,
  },
  url: {
    type: Object,
  },
});

const Favorite = model('Favorite', favSchema);

module.exports = Favorite;