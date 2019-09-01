$(document).ready(function() {

  /*
  // Used for testing purpose
  createFirstUser();
  //Used for testing purpose
  function createFirstUser () {
    $.ajax({
      type: "POST",
      url: "/user/add/",
      data: {"username" : "giulio.montenero10@gmail.com", "password" : "password"},
      async: true,
      dataType: "application/json"
    }).always(function(response){
      if(response.status == 200 && response.readyState == 4){
        if (response != null)
          location.reload();
      }
      else {
        alert("An error occurred during the login operation!");
      }
    });
  }
  */


  $('#login-btn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    if(username != '' && password != ''){
      authenticationLogin(username, password);
    }
    else {
    }
  });

  function authenticationLogin (username, password) {
    $.ajax({
      type: "POST",
      url: "/user/login/",
      data: {"username" : username, "password" : password},
      async: true,
      dataType: "application/json"
    }).always(function(response){
      if(response.status == 200 && response.readyState == 4){
        if (response != null){
          $.redirect('/user/todolistpage/', {'username': username});
          //$(location).attr('href', '/user/todolistpage/' + username);
          //location.reload();
        }
      }
      else {
        alert("An error occurred during the login operation! Please check again username and password.");
      }
    });
  }
});
