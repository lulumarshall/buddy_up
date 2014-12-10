messageAjax = {

}

messageAjax.allMessages = function(){
  $("#all_messages table tbody").empty('');
  $.ajax({
    url: '/messages', 
    type: 'GET' 
  }).success(function(response){
    $.each(response, function(index, item){
    console.log(index, item);

    var row = $("<tr>"+
      "<td>" + item.sender_id+"</td>"+
      "<td>" + item.receiver_id+"</td>"+
      "<td>" + item.subject +"</td>"+
      "<td>" + "<a class='btn btn-default' href='/messages/"+item.message_id+"'>show</a>"+"</td>" +
      "<td>" + "<a class='btn btn-default' href='/messages/"+item.message_id+"/edit'>edit</a>"+"</td>" +
      "<td><a class='btn btn-default' id='delete-message' href='/messages/" + item.message_id + "' data-method='delete' data-confirm='Are you sure?'>Delete</a></td>"
      )

    row.appendTo("#all_messages table tbody")
    });
  });
};

 messageAjax.sentMessages = function(){
  $("#all_messages table tbody").empty('');
  $.ajax({
    url:'/messages/sent',
    type: 'GET'
  }).success(function(response){
    $.each(response,function(index, item){
      console.log(index, item);
      var row = $("<tr>"+
        "<td>" + item.sender_id+"</td>"+
        "<td>" + item.receiver_id+"</td>"+
        "<td>" + item.subject +"</td>")
      row.appendTo("#all_messages table tbody")
    })
  })
 }
 messageAjax.receivedMessages = function(){
  $("#all_messages table tbody").empty('');
  $.ajax({
    url: '/messages/received',
    type: 'GET'
  }).success(function(response){
    $.each(response,function(index, item){
      console.log(index, item);
      var row = $("<tr>"+
        "<td>" + item.sender_id+"</td>"+
        "<td>" + item.receiver_id+"</td>"+
        "<td>" + item.subject +"</td>")
      row.appendTo("#all_messages table tbody")
    })
  })
 }
  

$(document).ready(function(){
  console.log('dom loaded')
  $(".all_messages").on('click', function(event){
 event.preventDefault();
 console.log('clicked on message')
 messageAjax.allMessages()
  });

  $("body").on('click', "#delete-message", function(event){
    event.preventDefault();
    console.log('deleted message')
  });

   $(".sent_messages").on('click', function(event){
  console.log('clicked on message')
  event.preventDefault();
  console.log('clicked on message')
  messageAjax.sentMessages()
   });

   $(".received_messages").on('click', function(event){
 console.log('clicked on message')
 event.preventDefault();
 messageAjax.receivedMessages()
  });
})