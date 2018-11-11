function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  setMarkers(map);
}

var theaters = [
  ['Regal Butler Town Center 14', 29.6272, -82.3772, 3],
  ['Regal Celebration Pointe 10 & RPX', 29.6237, -82.3953, 2],
  ['Regal Cinemas Royal Park 16', 29.6539, -82.3802, 1]
];
var myLatLng = {lat: 29.6436, lng: -82.3749};

function setMarkers(map) {

  var image = {
    url: 'images/popcorn.svg'
  };
  for (var i = 0; i < theaters.length; i++) {
    var theater = theaters[i];
    var marker = new google.maps.Marker({
      position: {lat: theater[1], lng: theater[2]},
      map: map,
      // icon: image,
      title: theater[0],
      zIndex: theater[3]
    });
    // var infowindow = new google.maps.InfoWindow({
    //   content: theater[0]
    // });
    // marker.addListener('click', function(){
    //   infowindow.open(map, marker);
    // });
  }
}

module.exports = initMap();
