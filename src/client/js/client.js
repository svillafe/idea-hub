import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory, DefaultRoute } from "react-router";

import Layout from "./pages/Layout"
import IdeaList from "./pages/IdeaList"
import AddIdea from "./pages/AddIdea"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
	<Provider store={store}>
		<Router  onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
		    <Route path="/" component={Layout}>
		      <IndexRoute component={IdeaList}></IndexRoute>
		      <Route path="new" component={AddIdea}/>
		    </Route>
		  </Router>
	</Provider>, app);