import React from "react";
import ReactDOM from 'react-dom';

import { connect } from "react-redux"
import { WithContext as ReactTags } from 'react-tag-input';
import { addIdea } from "../actions/ideasActions"

@connect((store) => {
  return {
    ideas : store.ideas.ideas
  }
})

export default class AddIdea extends React.Component {
  
  constructor() {
    super();
    this.state = {
      tags: [],
      suggestions: ["The Observer", "Social media", "Digidev", "Apps", "iPhone App", "Android App", "Chat", "ChatBot", "Conversational commerce", "NLP"]
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
	
  handleDelete(i) {
      let tags = this.state.tags;
      tags.splice(i, 1);
      this.setState({tags: tags});
  }

  handleAddition(tag) {    
    let tags = this.state.tags;
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({tags: tags});
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array 
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render 
    this.setState({ tags: tags });
  }

  handleSubmit(event) {
    this.state.labels = this.state.tags.map(tag => tag.text)
    this.props.dispatch(addIdea(this.state))
    this.props.router.push("/");
    event.preventDefault()
  }

	render() {
		let tags = this.state.tags;
    let suggestions = this.state.suggestions;

		return (
      <div class="container-fluid">
        <div class="idea-form col-md-6 col-md-offset-3">
          <h1> Add a new Idea</h1>
          
          <form onSubmit={this.handleSubmit}>
        	 <fieldset>
  	  		 <label class="idea-form__input">
              Title:<br/>
    	    		<input type="text" name="title" onChange={this.handleInputChange}/>
  	  		 </label><br/>
  	  		   Description:<br/>
           <label  class="idea-form__input">
    	    		<textarea name="description" onChange={this.handleInputChange}>
    					</textarea>
  	  		 </label><br/>
  	  		<label class="idea-form__input">
  	    		Tags:
  	    		<ReactTags 
  	    			tags={tags}
              suggestions={suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}/>

  	  		</label><br/>
  		  		<label class="idea-form__input">
  		    		Your Username:<br/>
  		    		<input type="text" name="author" onChange={this.handleInputChange}/>
  		  		</label><br/>
  		  		</fieldset>
  		  		<div class="idea-form__submit">
              <input type="submit" value="Submit"/>
            </div>
  				</form>
  	      </div>
        </div>
		);
	}
}