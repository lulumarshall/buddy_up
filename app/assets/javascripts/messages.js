messageAjax = {

}

messageAjax.createMessage = function(){
  $.ajax({
    url: '/messages', 
    type: 'GET', 
    data: {}
    dataType: 'json'
  }).success(function(){

  })
 }
  

$(document).ready(function(){
  console.log('dom loaded')
  $("#new_message").on('click', function(event){
 console.log('clicked on message')
 messageAjax.createMessage()
  });
})