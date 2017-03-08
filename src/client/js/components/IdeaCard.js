import React from "react";

import { connect } from "react-redux"
import FontAwesome from "react-fontawesome"
import { updateIdea } from "../actions/ideasActions"

@connect((store) => {
  return {
    ideas : store.ideas.ideas
  }
})

export default class IdeaCard extends React.Component {
	

  constructor() {
    super();
    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleUpvote(event) {
    let idea = {
      ...this.props.idea,
      amountOfVotes: this.props.idea.amountOfVotes + 1,
    }

    this.props.dispatch(updateIdea(idea))
  }

  render() {
		const { idea } = this.props;
		const tags = (!idea.labels? idea.tags : idea.labels).map((tag, i) => <span class="idea-card__tag">{tag}</span>);  

		return (
	      <div class="idea-card col-md-6 col-md-offset-3">
		      <div class="row">
	      		<div class="col-xs-3 col-sm-3">
	      			<div class="row">
	      				<div class="col-xs-6 col-sm-6">
	        				<div class="idea-card__upvote" onClick={this.handleUpvote}>
                  ↑<br/>
                  Upvote</div>
	        			</div>
	        			<div class="idea-card__votes col-xs-6 col-sm-6">
	        				{idea.amountOfVotes}<br/>
                  			votes
	        			</div>
	        		</div>
	      		</div>
	      		<div class="col-xs-4 col-sm-4">
	        		<h1 class="idea-card__title">{idea.title}</h1>
              <span class="idea-card__author">by {idea.author}</span>
	      		</div>
            <div class="col-xs-5 col-sm-5">
              {tags}
            </div>
	    		</div>
	      </div>
		);
	}
}