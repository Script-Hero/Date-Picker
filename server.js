const express = require('express')
const app = express();
const PORT = '3232';

const request = require('request');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";

function clear_console(){
  console.log('\033[2J');
}

app.get("/search/:search_term/:location", function(req, res){
  const MAX_DISTANCE = 22530;

  var search_term = req.params.search_term;
  var location = req.params.location;

  var query = {
    url : "https://api.yelp.com/v3/businesses/search?location=" + location + '&term=' + search_term + '&limit=50&radius=' + MAX_DISTANCE,
    headers : {
      'Authorization' : 'Bearer ' + API_KEY
    }
  };

  request(query, function(err, response, body){
    if(err){res.json(error)}
    else{
      var jsonBody = JSON.parse(body);
      var venues = jsonBody.businesses;
      res.json(venues);
    }
  })
})

app.get("/event_search/:location", function(req, res){
  var location = req.params.location;

  var query = {
    url : "https://api.yelp.com/v3/events?location=" + location,
    headers : {
      'Authorization' : 'Bearer ' + API_KEY
    }
  }

  request(query, function(err, response, body){
    if(err){req.json(err)}
    else{
      var jsonBody = JSON.parse(body);
      var events = jsonBody.events;
      res.json(events);
    }
  })
})


app.listen(PORT, () => console.log("Server Located on Port " + PORT));
