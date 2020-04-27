const express = require('express');
const request = require('request');

require('dotenv').config();

const apikey = process.env.API_KEY;
const router = express.Router();

router.get('/search', (req, res) => {
  res.render('search');
});

const a = [];
let j = 0;
function myFunction(mov) {
  a[j] = mov;
  j += 1;
}


router.post('/search', (req, res) => {
  const { keyword } = req.body;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
  request(url, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.parse(body);
      let i;
      let html = '';
      for (i = 0; i < 20; i += 1) {
        const movie = data.results[i].title;
        html += `<li><button style="border:1px transparent; background-color: transparent;" onclick="${myFunction(movie)}">${movie} </button></li> `;
      }
      res.render('results', { html });
    }
  });
});

router.get('/list', (req, res) => {
  console.log(a);
  let i;
  let html = '';
  for (i = 0; i < a.length; i += 1) {
    html += `<li>${a[i]}</li>`;
    console.log(a[i]);
  }
  res.render('list', { html });
});

module.exports = router;
