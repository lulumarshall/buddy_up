mapAjax = {
  map: null
}
  var geocoder;
  var rideLocations = [];


mapAjax.initialize = function(mapData){
  var map = new google.maps.Map(document.getElementById('map-canvas'));
  var bounds = new google.maps.LatLngBounds();
  // var contentString = "<p>hi there</p>"
  var infowindow = new google.maps.InfoWindow({
         content: contentString,
         maxWidth: 200
     });
       
  for (var i in mapData) {
    var p = mapData[i];
    var latlng = new google.maps.LatLng(p[0], p[1]);
    bounds.extend(latlng);
     
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: p[2],
      ride_distance: p[3]
    });
    var contentString = "<p>"+p[3]+p[2]+ "</p>"
  
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker, this);
    });
  }   
  map.fitBounds(bounds);
}

mapAjax.findRides = function(data){
  $.ajax({
    url:'/rides/filter_rides',
    type: 'Get',
    data: data
  })
  .done(function(response) {
    console.log('SUCCESS!')
    $.each(response, function(index, item){
      rideLocations.push([item.latitude,item.longitude, item.title, item.ride_distance]);
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
     
      mapAjax.findRides(data);
    })
  });
  
  $('#address').on('keypress', function(){
    if(event.which== '13'){
      var location = $(this).val()
      mapAjax.geocodeAddress(location)
    };
  });
  $('#address').on('click', function(event){
  event.preventDefault();

    });
})


