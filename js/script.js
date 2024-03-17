function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -14.235004, lng: -51.92528},
      zoom: 4
    });
  
    map.addListener('click', function(event) {
      placeMarker(event.latLng, map);
    });
  }
  
  function placeMarker(location, map) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  
    map.panTo(location);
    
    // Exibe as coordenadas na consola
    console.log("Latitude: " + location.lat() + " | Longitude: " + location.lng());
  }
  