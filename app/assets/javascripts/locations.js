mapAjax = {
  map: null
}
  var geocoder;


mapAjax.drawMap = function(location){
  var mapOptions = {
      zoom:16,
      center: location,
      
    }
  mapAjax.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var marker = new google.maps.Marker({
    position: location,
    map: mapAjax.map
  });
}

mapAjax.geocodeAddress = function(address){
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("results", results)
        mapAjax.initialize(results[0].geometry.location);
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

mapAjax.getLatLng = function(location){
  console.log(location);
};

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
})
