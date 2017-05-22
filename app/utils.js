var GeoPoint = require('geopoint');


function test() {
  var coords = ["0.0,0.0","5.0,5.0","7.0,7.0"];
  return calculateTotalDistance(coords);
}

function calculateTotalDistance(coordinates) {
  var length = coordinates.length;
  var total = 0;
  if (length < 2) {
    return total;
  }
  var point1 = new GeoPoint(parseInt(coordinates[0].split(',')[0]),parseInt(coordinates[0].split(',')[0]));
  var point2 = new GeoPoint(parseInt(coordinates[1].split(',')[0]),parseInt(coordinates[1].split(',')[1]));
  total += point1.distanceTo(point2);
  for (var i = 2; i < length; i++) {
    point1 = point2;
    point2 = new GeoPoint(parseInt(coordinates[i].split(',')[0]),parseInt(coordinates[i].split(',')[1]));
    total += point1.distanceTo(point2);
  }
  return roundTo2(toKilometers(total));
}

function toMiles(value) {
  return roundTo2(GeoPoint.kilometersToMiles(value));
}

function toKilometers(value) {
  return roundTo2(GeoPoint.milesToKilometers(value));
}

function roundTo2(value) {
  return Number(Math.round(value+'e'+2)+'e-'+2);
}

function inRadius(center, radius, point) {
  var lat = point.latitude();
  var long = point.longitude();

  if (lat == center.latitude() && long == center.longitude()) {
    return true;
  }

  var box = center.boundingCoordinates(radius);

  var sw = box[0];
  var ne = box[1];


  if (lat < ne.latitude() && lat > sw.latitude() && long < ne.latitude() && long > sw.latitude()) {
    return true;
  } else {
    return false;
  }
}

function inPlace(placeData,pointData) {
  var place = placeData.split(',').map(Number);
  var point = pointData.split(',').map(Number);
  var center = new GeoPoint(place[0],place[1]);
  var point = new GeoPoint(point[0], point[1]);
  var radius = place[2];
  return inRadius(center, radius, point);
}

function toGeoPoint(pointData) {
  var pointArr = pointData.split(',').map(Number);
  var point = new GeoPoint(pointArr[0], pointArr[1]);
  return point;
}

function checkPlaces(object, point) {
  var places = Array();
  for (var place in object) {
    if (object.hasOwnProperty(place)) {
      console.log(point);
      console.log(object[place]);
      if (inPlace(object[place], point)) {
        places.push(place);
      }
    }
  }
  var center = toGeoPoint(point);
  if (places.length > 1) {
    var min = Infinity;
    var thePlace = places[0];
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var point = toGeoPoint(object[place]);
      var d = center.distanceTo(point);
      if (d < min) {
        d = min;
        thePlace = place;
      }
    }
    return thePlace;
  }
  return places[0]
}

function test2() {
  return inRadius([0.0,0.0],10,[0.0,1.0]);
}

function test3() {
  return inPlace("0.0,0.0,200","0.0,1.0")
}

function test4() {
  var obj = {'gym':'7.0,7.3,1','school':'8.0,7.0,1','beach':'9.0002,7.0,50'};
  var p = '8.0,7.0';
  return checkPlaces(obj,p);
}

// console.log(test4());

function test() {
  var coords = ["0.0,0.0","5.0,5.0","7.0,7.0"];
  return calculateTotalDistance(coords);
}

const utils = {
  calculateTotalDistance,
  toKilometers,
  toMiles,
  checkPlaces
};
//
window.utils = utils;

export default utils;
