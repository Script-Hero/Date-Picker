import React from 'react';

// Picks a random element from an array
function pick_random(array){
  return array[Math.floor(Math.random() * array.length)]
}

// Component for setting search location
class UserInputBox extends React.Component{
  constructor(props){
    super(props);

    // Parent functions
    this.set_previous_location = this.props.setPrevLoc.bind(this); // Sets previous_location state value of parent component
    this.change_venue = this.props.newVenue.bind(this); // Changes the venue currently being used. Called after a new query is generated

    // Local Functions (handles forum input)
    this.handle_change = this.handle_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.handle_keypress = this.handle_keypress.bind(this);

    this.state = {text : ''}; // 'text' state is used when submitting search
  }

  // Enables enter key to be used to submit search
  handle_keypress(e){
    if(e.key === 'Enter'){
      this.handle_submit();
    }
  }

  // Updates the 'text' state whenever the contents of the textbox change
  handle_change(e){
    this.setState({text : e.target.value})
  }

  choose_search_term(){
    var search_terms = ['restaraunt','diner', 'lunch', 'dessert', 'coffee', 'date', 'romantic', 'fun', 'date', 'movie'];
    var chosen_search_term = pick_random(search_terms);
    return chosen_search_term
  }

  // Formats query and sends it to parent component
  handle_submit(){
    var chosen_search_term = this.choose_search_term();

    var previous_location = this.props.prevLoc;
    var textbox_contents = this.state.text.trim();

    var location;

    if(textbox_contents === '' ){ // Checks if textbox is empty
      if(previous_location !== null){ // If a location was previously searched, then it will use that location when the textbox is empty
        location = previous_location;
      }else{ // Otherwise, the Zip Code 77079 is the default location
        location = 'Houston, Texas 77079';
      }
    }else if(textbox_contents !== ''){ // Textbox Contents are not empty
      location = textbox_contents;
      this.set_previous_location(location);
    }

    this.change_venue(chosen_search_term, location);
  }

  render(){
    return(
      <div id='user-input-box'>
        <h2 id='input-elements-wrapper'>
          <input id='input-box' name='location' type='text' placeholder='Zip Code or Address' value={this.state.text} onChange={this.handle_change} onKeyPress={this.handle_keypress}></input>
          <button id='new-venue-btn'onClick={this.handle_submit} className='btn btn-lg btn-primary'>New Venue</button>
        </h2>
      </div>
    )
  }
}

export default UserInputBox;
