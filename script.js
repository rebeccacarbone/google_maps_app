let map;
let marker;
let listener;
let locationMarker;
let userClick;
let quiz;
let correct = 0;
let locationNames = [
  "The University Library", "Sierra Hall", "The Rec Center"
]
window.onload = function() {
  quiz = document.getElementById("quiz");
}

/*array containing the bounds of each location in this order:
  1. library
  2. sierra hall
  3. rec center
*/
let locationBounds = [
  {
    north: 34.240412,
    south: 34.239464,
    east: -118.528635,
    west: -118.530028,
  },
  {
    north: 34.238498,
    south: 34.237982,
    east: -118.530031,
    west: -118.531458,
  },
  {
    north: 34.240880,
    south: 34.239265,
    east: -118.524653,
    west: -118.525248,
  }
]

let currBounds = locationBounds[0];
let index = 0;

function initMap() {
  //remove labels from map
  var mapTypeStylesArray = [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ];
  
  //create map centered at csun
  //TODO: remove ability to scroll map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.2399489, lng: -118.5284461},
    zoom: 16,
    disableDefaultUI: true,
    styles: mapTypeStylesArray
  });
  
  //add listener to map that checks where the user clicked
  listener = map.addListener("click", (mapsMouseEvent) => {
    userClick = mapsMouseEvent.latLng.toJSON()
    checkClick(userClick);
  })
}

function checkClick(userClick) {
    if((userClick.lat <= currBounds.north && userClick.lat >= currBounds.south) && (userClick.lng >=     currBounds.west && userClick.lng <= currBounds.east)) {
      locationMarker = new google.maps.Rectangle({
      strokeColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00FF00",
      fillOpacity: 0.35,
      map,
      bounds: currBounds,
    });
    correct++;
    quiz.innerHTML+= "<br>Correct"
    }
    else {
      locationMarker = new google.maps.Rectangle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      bounds: currBounds,
    });
    quiz.innerHTML+= "<br>Incorrect"
    }
    if(index < 2) {
    currBounds = locationBounds[++index];
    quiz.innerHTML+= "<br>Where is " + locationNames[index];
    }
  
  else {
    google.maps.event.removeListener(listener);
    quiz.innerHTML+= "<br><br>Game Over"
    quiz.innerHTML+= "<br>Total Score: " + correct + " out of 3";
  }
  
}
