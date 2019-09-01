/**
 * Routes file for task
 */

var reg = require('../custom_module/Registry').Registry;

var taskController = reg.TaskController();

module.exports = function(app){
  /**
   * Add a new task
   */
    app.post('/task/add/', function(req, res){
      taskController.createTask(req.param("name"), req.param("user_task"));
      res.end();
    });

    /**
  	 * Delete a task
  	 */
  	app.post('/task/delete/', function(req, res){
  		var taskName = req.param("taskName");
      var userTask = req.param("user_task");

  		taskController.deleteTask(taskName, userTask).then(function(result){
  			if(result == null){
  				res.writeHead(404);
  				res.end();
  				return;
  			}
  			res.writeHead(200);
  			res.end();
  		});
  	});

    /**
 	  * Search for a task by name.
    */
   	app.post('/task/search/:taskName', function(req, res){
   		taskController.searchTask(req.param('taskName')).then(function(result){
   			var task = JSON.parse(result);

   			if(result != null && task != null && task.length > 0){
   				res.writeHead(200, {contentType : 'application/json'});
   				res.end(result);
   			}
   			else{
   				res.writeHead(404);
   				res.end();
   			}
   		});
 	  });

    /**
     * Retrieve all tasks from collection
     */
    app.get('/task/retrieveAll/', function(req, res){
    	taskController.retrieveAll().then(function(list_tasks){
    		res.write(list_tasks);
    		res.end();
		});
    });

    /**
     * Retrieve all tasks from collection by user name
     */
    app.post('/task/retrieveAllTasksByUser/:user_task', function(req, res){
    	taskController.retrieveAllTasksByUser(req.param("user_task")).then(function(list_tasks){
    		res.write(list_tasks);
    		res.end();
		});
    });
}
