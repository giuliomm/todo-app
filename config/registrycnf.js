/**
 * This files is a registry that is intended to be used to make the project code more modular and add all paths of config, modules, etc... used in this project (or those that will be used/added).
 * Functions are exported for 2 reasons: one is for the lightness of the result's object,
 * and second is to avoid circular dependency in the same module that cause parsing stop.
 *
 */

/* Config Paths */
module.exports.RegistryCnf = function(){ return require('./registrycnf'); };										//self-object :)
module.exports.MongoCnf = function(){ return require('./database'); };

/* Models Paths */
module.exports.TaskSchema = function(){ return require('../models/task'); };
module.exports.UserSchema = function(){ return require('../models/user'); };

/* Controllers Paths */
module.exports.TaskController = function(){ return require('../controllers/task'); };
module.exports.UserController = function(){ return require('../controllers/user'); };

/* Routes Paths */
module.exports.TaskRoutes = function(){ return require('../routes/task'); };
module.exports.UserRoutes = function(){ return require('../routes/user'); };
