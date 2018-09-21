const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = '3232';

const yelp = require('yelp-fusion');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";
const client = yelp.client(API_KEY);


app.get("/search/:search_term/:location", function(req, res){
  var search_term = req.params.search_term;
  var location = req.params.location;

  var query = {term:search_term, location:location};

  client.search(query).then(response => {

    var venues = response.jsonBody.businesses;
    res.json(venues);

  }).catch(error => {
    res.json(error);
  })
})

app.listen(PORT, () => console.log("Server Located on Port " + PORT));
