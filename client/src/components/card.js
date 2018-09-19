import React from 'react';


process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

function pick_random(array){
  return array[Math.round(Math.random() * array.length-1)]
}

class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {current_venue : null, error : null};

    this.new_venue = this.new_venue.bind(this);
    this.venue_caller = this.venue_caller.bind(this);

    this.venue_caller();
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
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue}></UserInputBox>
          </div>
        )
      }else{
        return(
          <div class='wrapper'>
            <h1>{this.state.error.name}</h1>
            <h1>Invalid Location. A typo perhaps?</h1>
            <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue}></UserInputBox>
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
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue}></UserInputBox>
          <div id='card'>
            <div id='textbox'>
              <h1 id='name'>{cur.name}</h1>
              <h2 id='categories'>Categories: {this.format_categories(cur.categories)}</h2>
              <h2 id='rating'>Rating: {cur.rating} / 5</h2>
              <h2 id='price'>Price: {cur.price}</h2>
              <h2 id='address'>{formatted_address}</h2>
              <h2 id='link'><a href={cur.url} target='_blank' textDecoration='none'>Website</a></h2>
              <h2><img id='image' height="400" width="400" src={cur.image_url} /></h2>
            </div>
          </div>
        </div>
      )
    }else{
      return(

        <div className="wrapper">
          <h1 className="header">Invalid Location. A typo perhaps?</h1>
          <h2 className="subheader">Try again with a slightly different search term!</h2>
          <UserInputBox venueCaller={this.venue_caller} newVenue={this.new_venue}></UserInputBox>
        </div>
      )
    }

  }
}


class UserInputBox extends React.Component{
  constructor(props){
    super(props);
    this.venue_caller = this.props.venueCaller.bind(this);
    this.new_venue = this.props.newVenue.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);


    this.state = {text : ''};
  }

  handle_change(e){
    this.setState({text : e.target.value})
  }

  handle_submit(){
    var search_terms = ['restaraunt','diner', 'lunch', 'park', 'dessert', 'coffee', 'date', 'romantic', 'fun', 'date', 'movie'];
    var chosen_term = pick_random(search_terms);

    if(this.state.text.trim() == ''){
      var location = '77079'
    }else{
      var location = this.state.text
    }

    this.setState({text : ''})

    this.new_venue(chosen_term, location);
  }

  render(){
    return(
      <div id='user-input-box'>
        <h2>
          <input name='location' type='text' placeholder='Enter an address or Zip Code' onChange={this.handle_change}></input>
          <button id='new-venue-btn'onClick={this.handle_submit} className='btn btn-lg btn-primary'>New Venue</button>
        </h2>
      </div>
    )
  }
}


export default Card;
