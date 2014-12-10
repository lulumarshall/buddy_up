mapAjax = {
  map: null
}
  var geocoder;
  var rideLocations = [];


mapAjax.initialize = function(mapData){
  var map = new google.maps.Map(document.getElementById('map-canvas'));
  var bounds = new google.maps.LatLngBounds();

  
  for (var i in mapData) {
    var p = mapData[i];
    var latlng = new google.maps.LatLng(p[0], p[1]);
    bounds.extend(latlng);
     
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: p[2],
      customData: p
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
          }); 
        var p = this.customData
        var contentString = "<h3>"+ p[2] +"</h3>"+
        "<ul><li><span>Distance: </span>"+p[5]+"meters</li>"+
        "<li><span>Address: </span>"+p[6]+"meters</li>"+
        "<li><span>Owner: </span>" + p[3] +"</li>"+
        "<a href= 'messages/new?receiver="+p[4]+"' class='btn btn-default' id='new-message' data-id='"+p[4]+"' data-method='GET'>Send Message</a></ul>"

        infowindow.setContent(contentString);
        infowindow.open(map, this);
      });
    }     
  map.fitBounds(bounds);
}

mapAjax.findRides = function(data){
  $('#ride_response table tbody').empty('');
  $.ajax({
    url:'/rides/filter_rides',
    type: 'Get',
    data: data
  })
  .done(function(response) {
    console.log('SUCCESS!')
    $.each(response, function(index, item){
      rideLocations.push([item.latitude,item.longitude, item.title, item.name, item.id, item.ride_distance, item.address]);
      var row = $("<tr>"+
        "<td>" + item.title+"</td>"+
        "<td>" + item.distance+"</td>"+
        "<td>" + item.address +"</td>"+
        "<td>" + item.name +"</td>"+
        "<td><a href= 'messages/new?receiver="+item.id+"' class='btn btn-default' id='new-message' data-id='"+item.id+"' data-method='GET'>Send Message</a></ul>")
      row.appendTo("#ride_response table tbody")
    });
    mapAjax.initialize(rideLocations)
  })
  .fail(function(err) {
    console.log('oops');
    console.log(err);   
  });
}

$(document).ready(function(){
  console.log('dom loaded')
  $('.map').on('click', function(event){
    event.preventDefault();
    var data = {}
    data.distance =$('#distanceInput').val()
    data.address =$('#addressInput').val()
    navigator.geolocation.getCurrentPosition(function(location){
      data.currentLocation = location.coords;
      // navigator.geolocation.getCurrentPosition(function(location){
      //   var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
      //   mapAjax.drawMap(currentLocation)
      // })
    $('.slide-table').slideDown();

      mapAjax.findRides(data);
    })

  });
})


