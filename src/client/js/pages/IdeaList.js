import React from "react";
import { Link } from "react-router"
import { connect } from "react-redux"
import { fetchIdeas } from "../actions/ideasActions"

import IdeaCard from "../components/IdeaCard"

@connect((store) => {
  return {
    ideas : store.ideas.ideas
  }
})

export default class IdeaList extends React.Component {
	componentWillMount() {
    this.props.dispatch(fetchIdeas())
  }

  render() {
    const { ideas } = this.props;
    
    const mappedIdeas = ideas.map((idea, i) => <IdeaCard key={i} idea={idea}/>);  
		
    return (
			<div class="container-fluid">
				<ul>{mappedIdeas}</ul>
			</div>
		);
	}
}