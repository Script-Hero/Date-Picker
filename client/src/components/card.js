import React from 'react';
import UserInputBox from './input_box';

function pick_random(array){
  return array[Math.floor( Math.random() * array.length)];
}


class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {current_venue : null, error : null, previous_location : null, color : null};

    this.change_current_venue = this.change_current_venue.bind(this);
    this.set_previous_location = this.set_previous_location.bind(this);

    this.change_current_venue("food", "houston"); // Default parameters for first render
  }

  set_color(){
    var colors = ["#bae1ff", "#baffc9", "#ffffba", "#ffdfba", "#ffb3ba"];
    var color = pick_random(colors);
    console.log(color)
    return color;
  }

  set_previous_location(location){
    this.setState({previous_location : location });
  }

  change_current_venue (search_term, location){
    this.setState({current_venue : null, error : null})
    var query = 'search/' + search_term + '/' + location;

    fetch(query).then(response => response.json()).then(response => {
      if(response.body !== undefined){ // Only errors respond with a body
        this.setState({error : response.body});
      }else{
        var venue = pick_random(response);
        this.setState({current_venue : venue});

        console.log(venue);
      }
    }).catch(err => {
      console.log(err);
      this.setState({error : err})
    })
  }

  format_categories(categories_array){
    var formatted_categories_array = [];

    // Formats array of categories into a string, with each element seperated by comma
    for(var i in categories_array){
      formatted_categories_array.push(categories_array[i].title + ', ');
    }

    // Removes comma from the last element of the string
    try{ // Sometimes fails, for some reason
      formatted_categories_array[formatted_categories_array.length - 1] = formatted_categories_array[formatted_categories_array.length - 1 ].slice(0, -2);
      return formatted_categories_array;
    }catch(err){
      return categories_array;
    }

  }

  format_address(address){
    var formatted_address = [];
    for(var i in address){
      formatted_address.push(address[i] + ' ');
    }
    return formatted_address;
  }

  render(){
    var cur = this.state.current_venue;

    if(this.state.error != null){
      if(this.state.error.name === 'SyntaxError'){ // SyntaxError because response isn't in proper JSON format
        return(
          <div class='wrapper'>
            <h1>Whoops! We couldn't retrieve the data from the server!</h1>
            <h2>Please try again in a moment!</h2>
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.change_current_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>
          </div>
        )
      }else{ // Generic Error Handling
        return(
          <div class='wrapper'>
            <h1>{this.state.error.name}</h1>
            <h1>Error. Try again?</h1>
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.change_current_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>
          </div>
        )
      }

    }else if(this.state.current_venue === null){ // Shown before API request is finished
      return(
        <div className="wrapper">
          <h1 className='header'>Loading...</h1>
        </div>
      )

    }else if(this.state.current_venue !== null && cur !== undefined){ // Shown when API request is finished successfully
      var formatted_address = this.format_address(cur.location.display_address);
      var background_color = this.set_color();
      return(
        <div className="wrapper" >
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.change_current_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>

          <div id='card' style={{backgroundColor : background_color}}>
            <div id='card-text' >
              <h2 id='name'>{cur.name}</h2>
              <h3 id='categories'>Categories: {this.format_categories(cur.categories)}</h3>
              <h3 id='rating'>Rating: {cur.rating} / 5</h3>
              <h3 id='price'>Price: {cur.price}</h3>
              <h3 id='address'>{formatted_address}</h3>
              <h3 id='link-wrapper'><a id='link' href={cur.url} target='_blank' textDecoration='none'>Website</a></h3>
            </div>
            <div id="image-div" style={{backgroundImage : 'url(' + cur.image_url + ')', backgroundSize: "100%"}}></div>
          </div>  
          <div id="card-shadow"></div>
        </div>
      )
    }else{
      return(

        <div className="wrapper">
          <h1 className="header">Whoops! Something went wrong!</h1>
          <h2 className="subheader">Try again with a slightly different search term, or just hit "New Venue" and see what happens!</h2>
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.change_current_venue} setPrevLoc={this.set_previous_location}></UserInputBox>
        </div>
      )
    }

  }
}




export default Card;
