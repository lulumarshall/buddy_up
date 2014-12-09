stravaMap ={

}
stravaMap.findStravaRoutes = function(data){ 
  $("#strava_response table tbody").empty(''); 
  $.ajax({
    url: 'strava/routes', 
    type: 'GET',
    data: data
  }).done(function(response){
    console.log(response)
    var data = response.segments;
    console.log('yo');
    $.each(data,function(index, item){
      console.log(index, item);
      rideLocations.push([item.start_latlng[0],item.start_latlng[1], item.name]);
      var row = $("<tr>"+
        "<td>" + item.name+"</td>"+
        "<td>" + item.start_latlng[0]+"</td>"+
        "<td>" + item.start_latlng[1] +"</td>"+
        "<td>" + item.avg_grade +"</td>"+
        "<td>" + item.end_latlng[0] +"</td>"+
        "<td>" + item.end_latlng[1] +"</td>")
      row.appendTo("#strava_response table tbody")
    });
    stravaMap.initialize(rideLocations)
  })
  .fail(function(err) {
    console.log('oops');
    console.log(err);   
  });
}




stravaMap.initialize = function(mapData){
  var map = new google.maps.Map(document.getElementById('map-canvas'));
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();
       
  for (var i in mapData) {
    var p = mapData[i];
    var latlng = new google.maps.LatLng(p[0], p[1]);
    bounds.extend(latlng);
     
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: p[2],
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(this.title);
      infowindow.open(map, this);
    });
  }   
  map.fitBounds(bounds);
}

$(document).ready(function(){
  console.log('dom loaded')
  $('.strava').on('click', function(event){
    event.preventDefault();
    var data = {}
    data.distance =$('#distanceInput').val()
    data.address =$('#addressInput').val()
    navigator.geolocation.getCurrentPosition(function(location){
      data.currentLocation = location.coords;
      stravaMap.findStravaRoutes(data);
    });
  });
});
