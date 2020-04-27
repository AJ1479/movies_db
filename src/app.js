const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mainRouter = require('./routes/main');

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || '3000'}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);
