const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = '3232';

const yelp = require('yelp-fusion');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";

const client = yelp.client(API_KEY);

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "Host");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.get("/search/:term/:location", function(req, res){
  var term = req.params.term;
  var location = req.params.location;

  var query = {term:term, location:location};

  try{
    client.search(query).then(response => {
      var businesses = response.jsonBody.businesses;

      res.json(businesses);
    }).catch(error => {
      res.json(error)
    })
  }catch(error){
    throw 'api_exception'
  }

})

app.listen(PORT, () => console.log("Server Located on Port " + PORT));
