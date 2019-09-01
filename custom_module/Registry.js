/**
 * This file is the Registry custom module. It is an indirection of Registry Configuration File.
 */

var RegistryCnf = require('../config/registrycnf');

module.exports.Registry = function(){
	return RegistryCnf;
}();								//So Function is automatically executed when used.
