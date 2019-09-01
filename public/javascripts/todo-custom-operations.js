$(document).ready(function() {

  $("#sortable").sortable();
  $("#sortable").disableSelection();

  countTodos();

  // count tasks
  function countTodos(){
      var count = $("#sortable li").length;
      $('.count-todos').html(count);
  }

  // home page button
  $('#home-btn').click(function () {
    $(location).attr('href', '/');
  });

});
