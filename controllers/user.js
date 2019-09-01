/**
 *  User Controller
 */

 var fs = require('fs');

 var reg = require('../custom_module/Registry').Registry;
 var UserSchema = reg.UserSchema();
 var Q = require('q');


 module.exports.createUser = function(username, password) {
  var deferred = Q.defer();
  var hashPassword = UserSchema.generateHash(password);
  var user = new UserSchema({"username" : username, "password" : hashPassword});

 	user.save(function(err, data){
    if(err || !data)
      deferred.resolve(null);
    else deferred.resolve(data);
  });
 };


 module.exports.deleteUser = function(username) {
 	var deferred = Q.defer();

 	UserSchema.findOneAndRemove({'username' : username}, {safe : true}, function(err, data){
 		if(err || !data)
 			deferred.resolve(null);
 		else deferred.resolve(data);
 	});

 	return deferred.promise;
 };


 module.exports.searchUser = function(username){
    var deferred = Q.defer();

    UserSchema.find({'username' : username}, function(err, data){
    	deferred.resolve(JSON.stringify(data));
    });
  };


  module.exports.checkUser = function (username, password){
    var deferred = Q.defer();
    UserSchema.findOne({'username' : username},{_id : 1, username : 1, password : 1}, function (err, user){
      if (err || !user)
        deferred.resolve(null);
      else {
        if (user.validPassword(password)){
          deferred.resolve(JSON.stringify(user));
        }
        else {
          deferred.resolve(null);
        }
      }
    });
    return deferred.promise;
  };

  // userSchema.methods.validPassword = function(password) {
  //     return bcrypt.compareSync(password, this.local.password);
  // };
