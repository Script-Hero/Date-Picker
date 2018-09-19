import React from 'react';
const yelp = require('yelp-fusion');
const API_KEY = "fFoHEGbf5qO3BdOMbgSY174VNDVnntD3kiyiznj5tUnCpTLvQICJwcfKqKbuHm9yaJRjP0hs2K73gHO1es1X3faeCtFc80fWZ6NwnDV9R2FeGN5qq5jI8Ku1EjydW3Yx";
const client = yelp.client(API_KEY);


function pick_random(array){
  return array[Math.round(Math.random() * array.length)]
}

class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {current_venue : null};

    this.new_venue = this.new_venue.bind(this);
  }

  new_venue(){


    fetch('search/bar/houston').then(response => {
      var venue = pick_random(response);
      this.setState({current_venue : venue});
    })


  }

  componentWillMount(){
    this.new_venue();
  }

  render(){


    return(
      <h1>{JSON.stringify(this.state.current_venue)}</h1>
    )

  }
}


export default Card;
