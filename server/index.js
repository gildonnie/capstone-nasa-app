const express = require('express');
const logger = require('morgan');
// const mongoo = require('mongoose');
// mongoo.connect('mongodb://localhost:27017/test');

const app = express();
const PORT = process.env.PORT || 9000;

//middlware
app.use(express.urlencoded({extended: true})); // enocodes url 
app.use(express.json()); // allows the data in post/put to be parrsed and understood by server
app.use(logger('dev')); // sets up logging in dev (information about the requests) helps to make sure your are hitting the routes you want to hit
app.use(express.static('public')); // before looking into routes look in this location first for html files/imgs/pdfs different files (will be changed when front end is connected)

// get creates and listens for routes with certain URLs paths that is declared
//posts routes are what recieves data from user side
app.get('/api/posts', (req, res) => {
  console.log('hit the route')
  console.log(req.url)
  res.send('test');
});

app.listen(PORT, () => {
  console.log('server now listening');
});

// 53 min in the video