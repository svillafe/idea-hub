'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    mId 	 = Schema.Types.ObjectId;

var IdeaSchema = new Schema({
  title    	    : { type : String },
  description   : { type : String },
  amountOfVotes : { type : Number},
  date 		    : { type : Date},
  author        : { type : String},
  labels        : [{ type : String}]
});

module.exports = mongoose.model('Idea', IdeaSchema);