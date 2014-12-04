mapAjax = {}
  var map;
mapAjax.initialize = function(location){
  console.log(location);
  var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  var mapOptions = {
      zoom:16,
      center: currentLocation,
      
    }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var marker = new google.maps.Marker({
    position: currentLocation,
    map: map
  });
}

$(document).ready(function(){
  console.log('dom loaded')
  $('.map').on('click', function(event){
    navigator.geolocation.getCurrentPosition(mapAjax.initialize)
  });
})
