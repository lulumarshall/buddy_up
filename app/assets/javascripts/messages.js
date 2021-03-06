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
      "<td>" + item.sender_name+"</td>"+
      "<td>" + item.subject +"</td>"+
      "<td>" + "<a class='btn btn-default' href='/messages/"+item.message_id+"'>show</a><a class='btn btn-default' href='/messages/"+item.message_id+"/edit'>edit</a><button class='btn btn-default' id='delete-message' data-id='" + item.message_id + "' data-confirm='Are you sure?'>Delete</button></td>"
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
        "<td>" + item.sender_name+"</td>"+
        "<td>" + item.subject +"</td>"+
        "<td>" + "<a class='btn btn-default' href='/messages/"+item.message_id+"'>show</a><a class='btn btn-default' href='/messages/"+item.message_id+"/edit'>edit</a><button class='btn btn-default' id='delete-message' data-id='" + item.message_id + "' data-confirm='Are you sure?'>Delete</button></td>"
        )
          row.appendTo("#all_messages table tbody")
          });
        });
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
        "<td>" + item.receiver_name+"</td>"+
        "<td>" + item.subject +"</td>"+
        "<td>" + "<a class='btn btn-default' href='/messages/"+item.message_id+"'>show</a><a class='btn btn-default' href='/messages/"+item.message_id+"/edit'>edit</a><button class='btn btn-default' id='delete-message' data-id='" + item.message_id + "' data-confirm='Are you sure?'>Delete</button></td>"
        )

          row.appendTo("#all_messages table tbody")
          });
        });
 }

 messageAjax.deleteMessage = function(){
  $this = $(this);
  $('#delete-message').first()
  var messageId = $(this).data('id');
   $.ajax({
     url:'/messages/' + messageId,
     type: 'DELETE',
     dataType: 'json'
   }).success(function(data){
     console.log(data, 'the ajax call was successful');
   $this.closest('tr').remove();
   })
 }

$(document).ready(function(){
  console.log('dom loaded')
  $(".all_messages").on('click', function(event){
 event.preventDefault();
 console.log('clicked on message')
 $('.slide-table').slideDown();
 messageAjax.allMessages()
  });

  $("body").on('click', "#delete-message", messageAjax.deleteMessage)

   $(".sent_messages").on('click', function(event){
  console.log('clicked on message')
  event.preventDefault();
  console.log('clicked on message')
  $('.slide-table').slideDown();
  messageAjax.sentMessages()
   });

   $(".received_messages").on('click', function(event){
 console.log('clicked on message')
 event.preventDefault();
 $('.slide-table').slideDown();
 messageAjax.receivedMessages()
  });
})