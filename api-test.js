const yelp = require('yelp-fusion');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";

const client = yelp.client(API_KEY);

const request = require('request');


function pick_random(array){
  return array[Math.round(Math.random() * array.length)]
}



function event_search(location){
  var query = {
    url : "https://api.yelp.com/v3/events?location=" + location,
    headers : {
      'Authorization' : 'Bearer ' + API_KEY
    }
  }

  request(query, function(err, response, body){
    var jsonBody = JSON.parse(body);
    console.log(jsonBody);
  })
}

function venue_search(location, term){
  const MAX_DISTANCE = 22530;
  var query = {
    url : "https://api.yelp.com/v3/businesses/search?location=" + location + '&term=' + term + '&limit=50&radius=' + MAX_DISTANCE,
    headers : {
      'Authorization' : 'Bearer ' + API_KEY
    }
  }

  request(query, function(err, response, body){
    var jsonBody = JSON.parse(body);
    console.log(jsonBody);
  })
}

event_search('houston');
