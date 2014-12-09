messageAjax = {

}

messageAjax.allMessages = function(){
  $.ajax({
    url: '/messages', 
    type: 'GET' 
  }).success(function(response){
    $.each(response, function(index, item){
    console.log(index, item);

    var row = $("<tr>"+
      "<td>" + item.sender_id+"</td>"+
      "<td>" + item.receiver_id+"</td>"+
      "<td>" + item.subject +"</td>")
    row.appendTo("#all_messages table tbody")
    });
  });
};

 messageAjax.sentMessages = function(){
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