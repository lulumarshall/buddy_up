mapAjax = {
  map: null
}
  var geocoder;


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
    debugger;
  })
}

$(document).ready(function(){
  console.log('dom loaded')
  $('.map').on('click', function(event){
    navigator.geolocation.getCurrentPosition(function(location){
      console.log()
      var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
      mapAjax.drawMap(currentLocation)
    })
  });

  $('#address').on('keypress', function(){
    if(event.which== '13'){
      var location = $(this).val()
      mapAjax.geocodeAddress(location)
    };
  });
  $('#filter_form').on('submit', function(event){
  event.preventDefault();
  debugger;
    });
})


