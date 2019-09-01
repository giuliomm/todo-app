/**
 * User Schema
 */

var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new Schema({
		username : {
			type 		: String,
			required 	: true,
			unique		: true
		},
		password : {
			type 		: String,
			required	: true
		}
},{collection : 'user'});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// checking if password is valid.
userSchema.methods.validPassword2 = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app.
module.exports = mongoose.model('User', userSchema);
module.exports.generateHash = userSchema.methods.generateHash;
