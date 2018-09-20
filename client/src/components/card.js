import React from 'react';
import UserInputBox from './input_box';

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

function pick_random(array){
  return array[Math.round(Math.random() * array.length-1)]
}

class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {current_venue : null, error : null, previous_location : null};

    this.new_venue = this.new_venue.bind(this);
    this.venue_caller = this.venue_caller.bind(this);
    this.set_previous_location = this.set_previous_location.bind(this);
    this.venue_caller();
  }

  set_previous_location(location){
    this.setState({previous_location : location });
  }

  new_venue(query, location){

    this.setState({current_venue : null, error : null})


      var constructed_query = 'search/' + query + '/' + location;


        fetch(constructed_query).then(response => response.json()).then(response => {
          if(response.body != undefined){
            this.setState({error : true})
          }else{
            var venue = pick_random(response);
            this.setState({current_venue : venue});
          }
        }).catch(err => {
          console.log(err);
          this.setState({error : err})
        })
  }

  venue_caller(){
    var search_terms = ['restaraunt','diner', 'lunch', 'park', 'dessert', 'coffee', 'date', 'romantic', 'fun', 'date'];
    var chosen_term = pick_random(search_terms);

    this.new_venue(chosen_term, '77079')
  }

  format_categories(cat_array){
    var formatted_cat_array = [];
    for(var i in cat_array){
      formatted_cat_array.push(cat_array[i].title + ', ');
    }

    formatted_cat_array[formatted_cat_array.length - 1] = formatted_cat_array[formatted_cat_array.length - 1 ].slice(0, -2);

    return formatted_cat_array;
  }

  render(){
    var cur = this.state.current_venue;

    if(this.state.error != null){
      console.log(this.state.error);
      if(this.state.error.name == 'SyntaxError'){
        return(
          <div class='wrapper'>
            <h1>Whoops! We couldn't retrieve the data from the server!</h1>
            <h2>Please try again in a moment!</h2>
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>
          </div>
        )
      }else{
        return(
          <div class='wrapper'>
            <h1>{this.state.error.name}</h1>
            <h1>Error. Try again?</h1>
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>
          </div>
        )
      }

    }else if(this.state.current_venue === null){
      return(
        <div className="wrapper">
          <h1 className='header'>Loading...</h1>
        </div>
      )

    }else if(this.state.current_venue != null){
      var formatted_address = [];
      for(var i in cur.location.display_address){
        formatted_address.push(cur.location.display_address[i] + ' ');
      }


      return(
        <div className="wrapper">
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue} setPrevLoc={this.set_previous_location} prevLoc={this.state.previous_location}></UserInputBox>
          <div id='card'>
            <div id='card-text'>
              <h2 id='name'>{cur.name}</h2>
              <h3 id='categories'>Categories: {this.format_categories(cur.categories)}</h3>
              <h3 id='rating'>Rating: {cur.rating} / 5</h3>
              <h3 id='price'>Price: {cur.price}</h3>
              <h3 id='address'>{formatted_address}</h3>
              <h3 id='link-wrapper'><a id='link' href={cur.url} target='_blank' textDecoration='none'>Website</a></h3>
            </div>
            <div id="image-div" style={{backgroundImage : 'url(' + cur.image_url + ')', backgroundSize: "100%"}}>

            </div>

          </div>
        </div>
      )
    }else{
      return(

        <div className="wrapper">
          <h1 className="header">Invalid Location. A typo perhaps?</h1>
          <h2 className="subheader">Try again with a slightly different search term!</h2>
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue} setPrevLoc={this.set_previous_location}></UserInputBox>
        </div>
      )
    }

  }
}




export default Card;
