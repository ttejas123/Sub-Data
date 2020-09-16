let subData;
let canvas;
let myMap;
let contries;
let data = [];
const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
const mappa = new Mappa('Leaflet');
function preload(){
	subData = loadTable('sub.csv','csv', 'header');
	contries = loadJSON('countries.json');
}

function setup(){
	canvas = createCanvas(640, 580);
	myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
	processData();
}

function draw(){
	  clear();
	  // Transform lat/lng to pixel position
      //const pos = myMap.latLngToPixel(11.3963, 5.0765);
      //using lat log draw eclips
      //ellipse(pos.x, pos.y, 20, 20);
      //console.log(contries);
 for (let country of data) {
    const pix = myMap.latLngToPixel(country.lat, country.lon);
    fill(255,0, 200, 100);
    const zoom = myMap.zoom();
    const scl = pow(2, zoom); // * sin(frameCount * 0.1);
    ellipse(pix.x, pix.y, country.diameter * scl);
  }
	 
}

function processData(){
    let minValue = Infinity;
    let maxValue = 0;
    data = [];
 
    for (let row of subData.rows) {
    	let dataContries = row.get('Geography').toLowerCase();
    	let viewsData = row.get('Views');
        let latlon = contries[dataContries];
        if (latlon) {
        	let lat = latlon[0];
        	let lon = latlon[1];
            data.push({
            	lat,
            	lon,
            	viewsData
            });
            console.log(data); 
            if (viewsData < minValue) {
            	minValue = viewsData;
            }
            if (viewsData > maxValue) {
            	maxValue = viewsData;
            }
        }
    }

    let minD = sqrt(minValue);
    let maxD = sqrt(maxValue);

    for (let country of data) {
    	console.log( country.diameter = map(sqrt(country.viewsData), minD, maxD, 1, 8));
    }
}