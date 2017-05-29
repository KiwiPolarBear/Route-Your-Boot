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

  var point1 = new GeoPoint(parseInt(coordinates[0].split(',')[0]),parseInt(coordinates[0].split(',')[1]));
  var point2 = new GeoPoint(parseInt(coordinates[1].split(',')[0]),parseInt(coordinates[1].split(',')[1]));
  total = point1.distanceTo(point2);
  for (var i = 2; i < length; i++) {
    point1 = point2;
    point2 = new GeoPoint(parseInt(coordinates[i].split(',')[0]),parseInt(coordinates[i].split(',')[1]));
    total += point1.distanceTo(point2);
  }
  return toKilometers(total);
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

  if (lat < ne.latitude() && lat > sw.latitude() && long < ne.longitude() && long > sw.longitude()) {
    return true;
  } else {
    return false;
  }
}



function toGeoPoint(pointData) {
  var pointArr = pointData.split(',').map(Number);
  var point = new GeoPoint(pointArr[0], pointArr[1]);
  return point;
}

function inPlace(rawPlace, rawPoint, rawRadius) {

  var place = rawPlace.split(',').map(Number);
  var point = rawPoint.split(',').map(Number);
  var center = new GeoPoint(place[0],place[1]);
  var point = new GeoPoint(point[0], point[1]);
  var radius = parseFloat(rawRadius);

  return inRadius(center, radius, point);
}

function checkPlaces(places, coord) {
  var within = new Array();
  for (var place in places) {
    if (places.hasOwnProperty(place)) {
      var center = places[place][0];
      var radius = places[place][1];
      var isIn = inPlace(center, coord, radius);
      if (isIn == true) {
        within.push(place);
      }
    }
  }
  if (within.length > 1) {
    var min = Infinity;
    var c = toGeoPoint(coord);
    for (var i = 0; i < within.length; i++) {
      var s = toGeoPoint(places[within[i]][0]);
      var d = s.distanceTo(c);
      if (d < min) {
        min = d;
        var optimal = within[i];
      }
    }
    return optimal;
  } else if (within.length == 0) {
    return coord;
  } else {
    return within[0];
  }
}

function test2() {
  return inRadius([0.0,0.0],10,[0.0,1.0]);
}

function test3() {
  return inPlace("0.0,0.0,200","0.0,1.0")
}


function test4() {
  var places = {'gym': [ '-43.522508,172.581007', 10 ], 'school': [ '-43.522508,172.581004', 10 ]};
  var coord = '-43.522508,172.581004';
  return checkPlaces(places,coord);
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

window.utils = utils;

export default utils;
