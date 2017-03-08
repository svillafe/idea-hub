// API routes
'use strict';
var express = require('express');
var router = express.Router();
var ideas = require('./controllers/ideasController');

module.exports = function(app) {
	
	//Ideas
	router.get('/ideas', ideas.list);
	router.post('/ideas', ideas.create);
	router.get('/ideas/:id', ideas.read);
	router.put('/ideas/:id', ideas.update);

	router.param('id', ideas.ideaByID);
	app.use('/api', router);
};