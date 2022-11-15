const { Schema, model } = require('mongoose');


const favsSchema = new Schema ({
  img_src: {
    type: Object,
  },
  earth_date: {
    type: Object,
  },
  email: {
    type: Object,
  },
});

const RoverFav = model('RoverFav', favsSchema);

module.exports = RoverFav;