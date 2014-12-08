mapAjax = {
  map: null
}
  var geocoder;
  var rideLocations = [];


mapAjax.drawMap = function(location){
  //var currentLocation = new google.maps.LatLng(latitude, longitude)
  var mapOptions = {
    zoom:16,
    center: location,  
  }
  mapAjax.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';
  var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });
  var marker = new google.maps.Marker({
    position: location,
    map: mapAjax.map,
    title: "lulu's content"
  });
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(mapAjax.map,marker);
    });
}

mapAjax.geocodeAddress = function(address){
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log("results", results)
      mapAjax.drawMap(results[0].geometry.location);
      mapAjax.findRiders(results[0].geometry.location)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
mapAjax.initialize = function(mapData){
  var map = new google.maps.Map(document.getElementById('map-canvas'));
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();

  debugger;
       
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
 
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(this.ride_distance.toString());
      infowindow.open(map, this);
    });
  }   
  map.fitBounds(bounds);
}

mapAjax.findRiders = function(location){
  $.ajax({
    url: '/rides', 
    type: 'GET', 
    data: {location: {
      lat: location.k,
      lng: location.B
    }},
    dataType: 'json' 
  }).success(function(data){
  })
}
mapAjax.findRides = function(data){
  $.ajax({
    url:'/rides/filter_rides',
    type: 'Get',
    data: data
  })
  .done(function(response) {
    console.log('SUCCESS!')
    // console.log(response);
    debugger;
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


