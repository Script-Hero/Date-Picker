import React from 'react';

function pick_random(array){
  return array[Math.round(Math.random() * array.length-1)]
}

class UserInputBox extends React.Component{
  constructor(props){
    super(props);
    this.set_previous_location = this.props.setPrevLoc.bind(this);
    this.new_venue = this.props.newVenue.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.handle_keypress = this.handle_keypress.bind(this);

    this.state = {text : '', previous_location : null};
  }

  handle_keypress(e){
    if(e.key == 'Enter'){
      this.handle_submit();
    }
  }

  handle_change(e){
    this.setState({text : e.target.value})
  }

  handle_submit(){
    var search_terms = ['restaraunt','diner', 'lunch', 'dessert', 'coffee', 'date', 'romantic', 'fun', 'date', 'movie'];
    var chosen_term = pick_random(search_terms);

    var previous_location = this.props.prevLoc;



    if(this.state.text.trim() == '' ){
      if(previous_location !== null){
        var location = previous_location;
      }else{
        var location = '77079'
      }
    }else{
      var location = this.state.text;
      this.set_previous_location(location);
    }

    console.log(this.state)


    this.new_venue(chosen_term, location);
  }

  render(){
    return(
      <div id='user-input-box'>
        <h2>
          <input id='input-box' name='location' type='text' placeholder='Zip Code or Address' value={this.state.text} onChange={this.handle_change} onKeyPress={this.handle_keypress}></input>
          <button id='new-venue-btn'onClick={this.handle_submit} className='btn btn-lg btn-primary'>New Venue</button>
        </h2>
      </div>
    )
  }
}

export default UserInputBox;
