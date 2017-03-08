'use strict';

module.exports = function(app) {
  
  var Idea = require('../models/idea'),
      API = {};    
  
  API.create = function(req, res){
    const idea = new Idea({
      title         : req.body.title,
      description   : req.body.description,
      amountOfVotes : 0,
      date          : req.body.date,
      author        : req.body.author,
      labels        : req.body.labels
    });

    idea
      .save()
      .then(function (idea){
        res.send({ '_id' : idea })
      }).catch(function(err) {
          console.log(err);
          res.sendStatus(500);
      });
  }

  API.list = function(req, res){
    Idea
      .find()
      .exec()
      .then(function(ideas){
        return res.send(ideas);
      });
  }

  API.read = function(req, res){

  }

  API.update = function(req, res){
    let idea = req.idea;
    idea.amountOfVotes = req.body.amountOfVotes;
    idea
      .save()
      .then(function (idea){
        res.send(idea);
      })    
  }

  API.ideaByID = function(req, res, next, id){
    Idea
      .findById(id)
      .exec()
      .then(function(idea) {
        req.idea = idea;
        next();
      });
  }

  return API;
}();
