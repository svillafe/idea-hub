import React from "react"
import { Link } from "react-router"

export default class Header extends React.Component {
	render() {
		return (
      <nav class="header navbar navbar-default">
        <a class="navbar-brand" href="#">Idea Hub</a>
        <ul class="nav navbar-nav">
          <li class="idea-link active"><a  href="#">List Ideas <span class="sr-only">(current)</span></a></li>
          <li class="idea-link"><Link to={`/new`}>New Idea</Link></li>
        </ul>

      </nav>
		);
	}
}