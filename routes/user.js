/**
*  User Routes
*/

var reg = require('../custom_module/Registry').Registry;

var userController = reg.UserController();

module.exports = function(app){

  /**
   * Basic Username and Password Login
   * Check if user exists.
   */
    app.post('/user/login/', function(req, res){
      userController.checkUser(req.param("username"), req.param("password")).then(function(result){
        if (result == null || result == undefined || result.length == 0 || result == "[]"){
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200);
        res.end();
      });
    });

  /**
   * Add a new user
   */
    app.post('/user/add/', function(req, res){
      userController.createUser(req.param("username"), req.param("password"));
      res.end();
    });

    app.post('/user/todolistpage/', function(req, res){

      res.render('todolist.ejs', {
    		title: 'Todo List Page',
        username: req.param("username")
    	});
    });

    /**
  	 * Delete a user
  	 */
  	app.post('/user/delete/', function(req, res){
  		var userName = req.param("username");

  		userController.deleteUser(userName).then(function(result){
  			if(result == null){
  				res.writeHead(404);
  				res.end();
  				return;
  			}
  			res.writeHead(200);
  			res.end();
  		});
  	});

}
