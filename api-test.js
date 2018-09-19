const yelp = require('yelp-fusion');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";

const client = yelp.client(API_KEY);

function pick_random(array){
  return array[Math.round(Math.random() * array.length)]
}


client.search({term : 'italian', location : 'houston, tx'}).then(response => {
  var businesses = response.jsonBody.businesses;
  console.log(pick_random(businesses));
})
