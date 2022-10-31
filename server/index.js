const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const favoriteRoutes = require('./routes/Favorites')
require('dotenv').config( {path: './.env'} );

const app = express();

//middlware

app.use(cors());
app.use(express.urlencoded({extended: true})); // enocodes url 
app.use(express.json()); // allows the data in post/put to be parrsed and understood by server
app.use(logger('dev')); // sets up logging in dev (information about the requests) helps to make sure your are hitting the routes you want to hit
app.use(express.static('public')); // before looking into routes look in this location first for html files/imgs/pdfs different files (will be changed when front end is connected)

app.use('/favorites', favoriteRoutes)

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URI
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then (() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((error) => console.log(error.message)); 