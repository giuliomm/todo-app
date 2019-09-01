/**
 *  Task Controller
 */

 var fs = require('fs');

 var reg = require('../custom_module/Registry').Registry;
 var TaskSchema = reg.TaskSchema();
 var Q = require('q');


 module.exports.createTask = function(name, user_task) {
  var deferred = Q.defer();
  var task = new TaskSchema({"name" : name, "user_task" : user_task});

 	task.save(function(err, data){
    if (err || !data)
      deferred.resolve(null);
    else
      deferred.resolve(data);
  });
 };


 module.exports.deleteTask = function(name, user_task) {
 	var deferred = Q.defer();

 	TaskSchema.findOneAndRemove({'name' : name, 'user_task' : user_task}, {safe : true}, function(err, data){
 		if(err || !data)
 			deferred.resolve(null);
 		else deferred.resolve(data);
 	});

 	return deferred.promise;
 };


 module.exports.searchTask = function(name) {
 	var deferred = Q.defer();

 	TaskSchema.find({'name' : name}, function(err, data){
 		deferred.resolve(JSON.stringify(data));
 	});

 	return deferred.promise;
 };


 module.exports.retrieveAll = function(req, res) {
 	var deferred = Q.defer();

 	TaskSchema.find({}, function(err,tasks) {
 		if(err) {
 			return err;
 		} else {
 			deferred.resolve(JSON.stringify(tasks));
 		}
 	});
 	return deferred.promise;
 };


 module.exports.retrieveAllTasksByUser = function(user_task) {
 	var deferred = Q.defer();

 	TaskSchema.find({'user_task' : user_task}, function(err,tasks) {
 		if(err || !tasks) {
 			return err;
 		} else {
 			deferred.resolve(JSON.stringify(tasks));
 		}
 	});
 	return deferred.promise;
 };
