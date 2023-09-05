// mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb2ppYW5nZ2lzIiwiYSI6ImNrNnI5ZzJmcDAxNWszbW9mMjV1bGxsb3oifQ.O2EHW7BWQ3-qjo_u7ddqNA';
mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb2ppYW5nZ2lzIiwiYSI6ImNqeXN5dDB0dzAxN2wzb3RjZDd0dThrOXoifQ.-teQ6oB1SznwZKZNpLTE-A';

var map = new mapboxgl.Map({
  container: 'map',
  // style: 'mapbox://styles/xiaojianggis/ckp7qfx284b7u18mlnu6bwssb', // previous mrt version, old version
  style: 'mapbox://styles/xiaojianggis/cl5el2sor001h15o58lnabwoq', //utci0, small cities
  // style: 'mapbox://styles/xiaojianggis/ckihvfymy0unq19oj6kwzjezt',
  center: [-75.15313882264648, 39.98675663514595], //40.442911699193765, -3.6322877645863807
  zoom: 10.5,
  minZoom: 10
});

var medium_cities = ["atlanta", "austin", "boston", "baltimore", "chicago",  "washington", "miami", "nashville", "philadelphia", "san francisco", "seattle", "san diego"];
var big_cities = ['new york city', "dallas", 'los angeles', 'houston']


// var slider = document.getElementById('slider');
// var sliderValue = document.getElementById('slider-value');

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  flyTo: {
    bearing: 0,
    // Control the flight curve, making it move slowly and
    // zoom out almost completely before starting to pan.
    speed: 20, // Make the flying slow.
    curve: 1, // Change the speed at which it zooms out.
    // This can be any easing function: it takes a number between
    // 0 and 1 and returns another number between 0 and 1.
    easing: function (t) {
      return t;
    }
  },

  marker: {
    color: 'blue'
  },
  mapboxgl: mapboxgl
});

// map.addControl(geocoder, 'top-left');
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// breaks = [38, 43, 50, 57, 67] # for LA
// breaks = [33, 38, 43, 47, 53] # for boston
// breaks = [40, 45, 49, 53, 57] # for baltimore
// breaks = [39, 46, 52, 56, 59] # for DC
// breaks = [40, 46, 51, 55, 60] # for Miami
// breaks = [35, 43, 49, 53, 56] # for Chicago
// breaks = [41, 46, 52, 57, 64] # for Atlanta
// breaks = [39, 45, 50, 53, 58] # for Philadelphia
// breaks = [32, 39, 44, 48, 53] # for san_francisco
// breaks = [28, 36, 44, 50, 56] # for seattle
// breaks = [40, 46, 52, 57, 66] # san_diego
// breaks = [42, 48, 55, 60, 67] # dallas
// breaks = [41, 48, 55, 59, 63] # houston
// breaks = [40, 48, 57, 61, 68] # LA
// breaks = [35, 40, 45, 49, 55] # for New York City

// city location, lon, lat, view zoom, 
var citycoords = new Object();
// citycoords["boston"] = [42.31901259509799, -71.09256387480792, 11, ['<33', '33-38', '38-43', '43-47', '47-53']];
// citycoords['baltimore'] = [39.31123765013042, -76.61840913262718, 11, ['<40', '40-45', '45-49', '49-53', '53-57']];
// citycoords['washington'] = [38.91534357808685, -77.02192823438375, 11, ['<39', '39-46', '46-52', '52-56', '56-59']];
// citycoords['seattle'] = [47.61555186154012, -122.3435799256088, 11, ['<28', '28-36', '36-44', '44-50', '50-56']];
// citycoords['san diego'] = [32.84018393677258, -117.15608171628791, 11, ['<40', '40-46', '46-52', '52-57', '57-66']];
// citycoords['philadelphia'] = [39.98675663514595, -75.15313882264648, 11, ['<39', '39-45', '45-50', '50-53', '53-58']];
// citycoords['miami'] = [25.777476201525072, -80.21834080668762, 11, ['<40', '40-46', '46-51', '51-55', '55-60']];
// citycoords['los angeles'] = [34.07483852023736, -118.32892140164431, 9, ['<38', '38-43', '43-50', '50-57', '57-67']];
// citycoords['san francisco'] = [37.76532315179079, -122.44391726879564, 11, ['<32', '32-39', '39-44', '44-48', '48-53']];
// citycoords['chicago'] = [41.854891400317754, -87.67040202741047, 10, ['<35', '35-43', '43-49', '49-53', '53-56']];
// citycoords['atlanta'] = [33.7637757252088, -84.42633326861935, 11, ['<41', '41-46', '46-52', '52-57', '57-64']];
// citycoords['houston'] = [29.748829215846698, -95.39474993214351, 10, ['<41', '41-48', '48-55', '55-59', '59-63']];
// citycoords['dallas'] = [32.81421602557406, -96.79954559171003, 10, ['<42', '42-48', '48-55', '55-60', '60-67']];
// citycoords['new york city'] = [40.6923291662734, -73.93271426982291, 10, ['<35', '35-40', '40-45', '45-49', '49-55']];

// citycoords["boston"] = [42.31901259509799, -71.09256387480792, 11, ['<27.7', '27.7-33.0', '33.0-39.2', '39.2-44.6', '44.6+'], ['<25.8', '25.8-27.2', '27.2-28.9', '28.9-30.4', '30.4+']];
// citycoords['baltimore'] = [39.31123765013042, -76.61840913262718, 11, ['<34.0', '34.0-39.5', '39.5-45.1', '45.1-49.9', '49.9+'], ['<28.6', '28.6-29.9', '29.9-31.2', '31.2-32.4', '32.4+']];
// citycoords['washington'] = [38.91534357808685, -77.02192823438375, 11, ['<34.5', '34.5-40.1', '40.1-47.1', '47.1-52.2', '55.2+'], ['<29.2', '29.2-30.6', '30.6-32.3', '32.3-33.5', '33.5+']];
// citycoords['seattle'] = [47.61555186154012, -122.3435799256088, 11, ['<27.3', '27.3-33.0', '33.0-40.7', '40.7-46.9', '46.9+'], ['<24.9', '24.9-26.5', '26.5-28.6', '28.6-30.4', '30.4+']];
// citycoords['san diego'] = [32.84018393677258, -117.15608171628791, 11, ['<31.4', '31.4-38.8', '38.8-46.0', '46.0-51.3', '51.3+'], ['<25.4', '25.4-27.2', '27.2-29.0', '29.0-30.3', '30.3+']];
// citycoords['philadelphia'] = [39.98675663514595, -75.15313882264648, 11, ['<29.7', '29.7-35.6', '35.6-41.7', '41.7-46.6', '46.6+'], ['<25.6', '25.6-27.1', '27.1-28.7', '28.7-29.9', '29.9+']];
// citycoords['miami'] = [25.777476201525072, -80.21834080668762, 11, ['<33.6', '33.6-39.7', '39.7-46.4', '46.4-51.5', '51.5+'], ['<30.0', '30.0-31.3', '31.3-32.7', '32.7-33.8', '33.8+']];
// citycoords['los angeles'] = [34.07483852023736, -118.32892140164431, 9, ['<31.7', '31.7-40.4', '40.4-48.7', '48.7-54.8', '54.8+'], ['<26.8', '26.8-28.9', '28.9-30.9', '30.9-32.4', '32.4+']];
// citycoords['san francisco'] = [37.76532315179079, -122.44391726879564, 11, ['<26.0', '26.0-32.0', '32.0-38.4', '38.4-43.7', '43.7+'], ['<20.5', '20.5-22.2', '22.2-23.9', '23.9-25.4', '25.4+']];
// citycoords['chicago'] = [41.854891400317754, -87.67040202741047, 10, ['<28.8', '28.8-35.4', '35.4-42.9', '42.9-48.6', '48.6+'], ['<22.9', '22.9-24.6', '24.6-26.5', '26.5-28.0', '28.0+']];
// citycoords['atlanta'] = [33.7637757252088, -84.42633326861935, 11, ['<34.5', '34.5-39.6', '39.6-46.8', '46.8-53.2', '53.2+'], ['<32.2', '32.2-33.4', '33.4-35.2', '35.2-36.8', '36.8+']];
// citycoords['houston'] = [29.748829215846698, -95.39474993214351, 10, ['<36.6', '36.6-42.7', '42.7-50.7', '50.7-56.2', '56.2+'], ['<33.6', '33.6-35.0', '35.0-36.9', '36.9-38.1', '38.1+']];
// citycoords['dallas'] = [32.81421602557406, -96.79954559171003, 10, ['<37.1', '37.1-43.7', '43.7-51.4', '51.4-57.3', '57.3+'], ['<33.5', '33.5-35.0', '35.0-36.7', '36.7-38.0', '38.0+']];
// citycoords['new york city'] = [40.6923291662734, -73.93271426982291, 10, ['<29.6', '29.6-35.1', '35.1-41.5', '41.5-46.9', '46.9+'], ['<24.0', '24.0-25.3', '25.3-26.9', '26.9-28.3', '28.3+']];
citycoords["austin"] = [30.268931484822172, -97.7471287493868, 11, ['<28', '28-33', '33-39', '39-45', '45+'], ['<26', '26-27', '27-29', '29-30', '30+']];
citycoords["boston"] = [42.31901259509799, -71.09256387480792, 11, ['<28', '28-33', '33-39', '39-45', '45+'], ['<26', '26-27', '27-29', '29-30', '30+']];
citycoords['baltimore'] = [39.31123765013042, -76.61840913262718, 11, ['<34', '34-40', '40-45', '45-50', '50+'], ['<29', '29-30', '30-31', '31-32', '32+']];
citycoords['washington'] = [38.91534357808685, -77.02192823438375, 11, ['<35', '35-40', '40-47', '47-52', '55+'], ['<29', '29-31', '31-32', '32-34', '34+']];
citycoords['seattle'] = [47.61555186154012, -122.3435799256088, 11, ['<27', '27-33', '33-41', '41-47', '47+'], ['<25', '25-27', '27-29', '29-30', '30+']];
citycoords['san diego'] = [32.84018393677258, -117.15608171628791, 11, ['<31', '31-39', '39-46', '46-51', '51+'], ['<25', '25-27', '27-29', '29-30', '30+']];
citycoords['philadelphia'] = [39.98675663514595, -75.15313882264648, 11, ['<30', '30-36', '36-42', '42-47', '47+'], ['<26', '26-27', '27-29', '29-30', '30+']];
citycoords['miami'] = [25.777476201525072, -80.21834080668762, 11, ['<34', '34-40', '40-46', '46-52', '52+'], ['<30', '30-31', '31-33', '33-34', '34+']];
citycoords['nashville'] = [36.16613542187021, -86.78318605040803, 10, ['<35', '35-40', '40-48', '48-55', '55+'], ['<32', '32-34', '34-36', '36-37', '37+']];
citycoords['los angeles'] = [34.07483852023736, -118.32892140164431, 9, ['<32', '32-40', '40-49', '49-55', '55+'], ['<27', '27-29', '29-31', '31-32', '32+']];
citycoords['san francisco'] = [37.76532315179079, -122.44391726879564, 11, ['<26', '26-32', '32-38', '38-44', '44+'], ['<21', '21-22', '22-24', '24-25', '25+']];
citycoords['chicago'] = [41.854891400317754, -87.67040202741047, 10, ['<29', '29-35', '35-43', '43-49', '49+'], ['<23', '23-25', '25-27', '27-28', '28+']];
citycoords['atlanta'] = [33.7637757252088, -84.42633326861935, 11, ['<35', '35-40', '40-47', '47-53', '53+'], ['<32', '32-33', '33-35', '35-37', '37+']];
citycoords['houston'] = [29.748829215846698, -95.39474993214351, 10, ['<37', '37-43', '43-51', '51-56', '56+'], ['<34', '34-35', '35-37', '37-38', '38+']];
citycoords['dallas'] = [32.81421602557406, -96.79954559171003, 10, ['<37', '37-44', '44-51', '51-57', '57+'], ['<34', '34-35', '35-37', '37-38', '38+']];
citycoords['new york city'] = [40.6923291662734, -73.93271426982291, 10, ['<30', '30-35', '35-42', '42-47', '47+'], ['<24', '24-25', '25-27', '27-28', '28+']];

map.on('load', function () {
  initLayer();
});

// set the map style once initate the map
function initLayer(){
  // map.setStyle('mapbox://styles/xiaojianggis/ckomubivm3kuj19qigglenoi4');

  // var lon = -75.15313882264648;
  // var lat = 39.98675663514595;
  // // var lat = citycoords['baltimore'][0];
  // // var lon = citycoords['baltimore'][1];
  
  // // map.flyTo({
  // //   center: [lon, lat]
  // // });
  // map.setCenter([lon, lat]);  


  // map.addSource('mrt_philly', {
  //     type: 'raster',
  //     url: 'mapbox://xiaojianggis.1206n34k'
  // });

  // map.addLayer({
  //     'id': 'philly_ras',
  //     'type': 'raster',
  //     'source': 'mrt_philly'
  // });

  var layerList = document.getElementById('menu');
  var inputs = layerList.getElementsByTagName('input');
  
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
  }

  addLegend('philadelphia');
  
  // var geocoder = new MapboxGeocoder({
  //   accessToken: mapboxgl.accessToken,
  //   marker: {
  //     color: 'orange'
  //   },
  //   mapboxgl: mapboxgl
  // });
  
  // // map.addControl(geocoder, 'top-left');
  // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  // Listen for the `geocoder.input` event that is triggered when a user makes a selection
    geocoder.on('result', function (ev) {
      var styleSpec = ev.result;
      var address = styleSpec['place_name_en-US'].split(', ')
      if (address[2] == 'United States'){ //type in the city name note the address
        city = address[0].toLowerCase();
        updateMap(city);
      } else {
        city = address[1].toLowerCase();
      }
      
      console.log(city);
      console.log('----------------');
      // updateMap(city);
      addLegend(city);
      document.getElementById('city').value = city;
      
      console.log(city);
      var styleSpecText = JSON.stringify(styleSpec, null, 2);
      var syntaxStyleSpecText = syntaxHighlight(styleSpecText);

    });

  function syntaxHighlight(json) {
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }
}

// check which layer, utci or mrt is selected 
function retrieveLayer(){
  var heat_metric;
  var layerList = document.getElementById('menu');
  var inputs = layerList.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'radio' && inputs[i].checked) {
          // get value, set checked flag or do whatever you need to
          heat_metric = inputs[i].id;
      }
  }
  return heat_metric
}

function addLegend(city){
    // var ranges = ['32-39', '40-45', '45-50', '50-53', '53-58'];
    var ranges = [];
    var heat_metric = retrieveLayer();
    
    console.log("This is processig");
    console.log(heat_metric);

    if (heat_metric == 'utci'){
      document.getElementById("heattime").innerHTML = "Universal Thermal Climate Index (°C)";
      ranges = citycoords[city][4];
    }
    if (heat_metric == "mrt") {
      document.getElementById("heattime").innerHTML = "Mean Radiant Temperature (°C)";
      ranges = citycoords[city][3];
    }

    console.log(ranges);
    var colors = [
      '#000004',
      '#57106E',
      '#BC3755',
      '#FA8D0A',
      '#FDFFA5',
    ]; 

    // clear all chilc of the legendbrick div
    while (legendbrick.lastElementChild) {
      legendbrick.removeChild(legendbrick.lastElementChild);
    }

    // create legend color brick
    for (i = 0; i < colors.length; i++) {
        var color = colors[i];
        // var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
          // key.style.width = '10px';
        // key.innerHTML = layer;
        legendbrick.appendChild(key);
    }

    // create legend labels
    for (i = 0; i < ranges.length; i++) {
        var layer = ranges[i];
        var mrtlabel = document.createElement('label');
        mrtlabel.textContent = layer;
        // mrtlabel.style.textAlign = "left"
        legendbrick.appendChild(mrtlabel);
    }
}

function fly2cityHeatMap(city) {
  // document.getElementById("demo").innerHTML = "Hello World";
  updateMap(city);
  document.getElementById("fly2cityHeatMap").checked = true;
}

//detect the change of the dropdown for different cities
function leaveChange(control) {
    var city = control.value;
    updateMap(city);
    addLegend(city);
}

function switchLayer(layer) {
  var layerId = layer.target.id;
  console.log(layerId);
  console.log("===================")
  var city = document.getElementById("city").value;

  addLegend(city)
  console.log("add the city--------------")
  
  var legendTitle = '';
  if (layerId == 'satellite') {
    map.setStyle('mapbox://styles/xiaojianggis/ckphr143t2wsk18s4lui33b5l');
  } else if (layerId == "map"){
    map.setStyle("mapbox://styles/mapbox/streets-v11")
  }else if (layerId == 'mrt') {
    if (medium_cities.includes(city, 0)) {
      map.setStyle('mapbox://styles/xiaojianggis/cl5k6f4hf003a15ju96ciie8s');
    } else {
      map.setStyle('mapbox://styles/xiaojianggis/cl5k9w2oc005o14n9ahtd7q3h');
    }
    // document.getElementById("heattime").innerHTML = "Mean Radiant Temperature (°C)";
    legendTitle = "Mean Radiant Temperature (°C)";
  } else {
    console.log("This is the UTCI")
    if (medium_cities.includes(city, 0)) {
      map.setStyle('mapbox://styles/xiaojianggis/cl5el2sor001h15o58lnabwoq');
    } else {
      map.setStyle('mapbox://styles/xiaojianggis/cl5g3rbjx001h14pax52fv1ub');
    }
    // document.getElementById("heattime").innerHTML = "Universal Thermal Climate Index (°C)";
    legendTitle = "Universal Thermal Climate Index (°C)";
  }

  document.getElementById("heattime").innerHTML = legendTitle;
}

// update the show layer, when different city was selected
function updateMap(city) {
  console.log(city);
  console.log(citycoords);
  console.log(citycoords[city]);
  console.log(city=='philadelphia'); 
  updateLegendTitle()
  
  var layerList = document.getElementById('menu');
  var inputs = layerList.getElementsByTagName('input');

  var heat_metric = retrieveLayer();

  console.log("this radio is selected")
  console.log(heat_metric);

  var lat = citycoords[city][0];
  var lon = citycoords[city][1];
  var zoom = citycoords[city][2];

  console.log(citycoords[city][3]);
  
  map.setCenter([lon, lat]);
  map.setZoom(zoom);
  
  //judge whether to use large style or the medium city style layer
  if (heat_metric == 'mrt') {
    if (medium_cities.includes(city, 0)) {
      map.setStyle('mapbox://styles/xiaojianggis/ckp7qfx284b7u18mlnu6bwssb');
    } else {
      map.setStyle('mapbox://styles/xiaojianggis/ckp7qe5kn07nh18oiilcmsun1');
    }
  }
  
  if (heat_metric == "utci") {
    if (medium_cities.includes(city, 0)) {
      map.setStyle('mapbox://styles/xiaojianggis/cl5el2sor001h15o58lnabwoq');
    } else {
      map.setStyle('mapbox://styles/xiaojianggis/cl5g3rbjx001h14pax52fv1ub');
    }
  }

  document.getElementById('city').value = city;
  // addLegend(city);
}


function updateLegendTitle(){
  var heat_metric = retrieveLayer();

  if (heat_metric == 'utci'){
    document.getElementById("heattime").innerHTML = "Universal Thermal Climate Index (°C)";
  }
  if (heat_metric == "mrt") {
    document.getElementById("heattime").innerHTML = "Mean Radiant Temperature (°C)";
  }

}