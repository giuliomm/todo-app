/**
 * This is the schema in which there are the details of a new task added to the todo list. Even if a task is simple, the modularity of this will allow to modify it in the future.
 */

var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var TaskSchema = new Schema({

	name : {
		type : String,
		default : ""
	},

	user_task : {
		type : String
	}

}, {collection : 'task'});

module.exports = mongoose.model('Task', TaskSchema);
