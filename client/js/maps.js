var locations = [
  ['Regal Butler Town Center 14', 29.6272, -82.3772, 3],
  ['Regal Celebration Pointe 10 & RPX', 29.6237, -82.3953, 2],
  ['Regal Cinemas Royal Park 16', 29.6539, -82.3802, 1]
];
var myLatLng = {lat: 29.6436, lng: -82.3749};

//make the map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });
  setMarkers(map, locations);
}
function setMarkers(map, locations){
  for(var i = 0; i < locations.length; i++){
    var marker = locations[i];
    var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
    var content = locations[i][0];
    var infowindow = new google.maps.InfoWindow();

    marker = new google.maps.Marker({
      position:latLng,
      map: map
    });

    google.maps.event.addListener(marker, 'click', function(content){
      return function(){
        infowindow.setContent(content);
        infowindow.open(map, this);
      }
    }(content));
  }
}
