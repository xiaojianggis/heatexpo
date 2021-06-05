
mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb2ppYW5nZ2lzIiwiYSI6ImNrNnI5ZzJmcDAxNWszbW9mMjV1bGxsb3oifQ.O2EHW7BWQ3-qjo_u7ddqNA';
mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb2ppYW5nZ2lzIiwiYSI6ImNqeXN5dDB0dzAxN2wzb3RjZDd0dThrOXoifQ.-teQ6oB1SznwZKZNpLTE-A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/xiaojianggis/ckp7qfx284b7u18mlnu6bwssb',
  // style: 'mapbox://styles/xiaojianggis/ckihvfymy0unq19oj6kwzjezt',
  center: [-75.15313882264648, 39.98675663514595], //40.442911699193765, -3.6322877645863807
  zoom: 10.5,
  minZoom: 10
});


var slider = document.getElementById('slider');
var sliderValue = document.getElementById('slider-value');


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
citycoords["boston"] = [42.31901259509799, -71.09256387480792, 11, ['<33', '33-38', '38-43', '43-47', '47-53']];
citycoords['baltimore'] = [39.31123765013042, -76.61840913262718, 11, ['<40', '40-45', '45-49', '49-53', '53-57']];
citycoords['dc'] = [38.91534357808685, -77.02192823438375, 11, ['<39', '39-46', '46-52', '52-56', '56-59']];
citycoords['seattle'] = [47.61555186154012, -122.3435799256088, 11, ['<28', '28-36', '36-44', '44-50', '50-56']];
citycoords['san diego'] = [32.84018393677258, -117.15608171628791, 11, ['<40', '40-46', '46-52', '52-57', '57-66']];
citycoords['philadelphia'] = [39.98675663514595, -75.15313882264648, 11, ['<39', '39-45', '45-50', '50-53', '53-58']];
citycoords['miami'] = [25.777476201525072, -80.21834080668762, 14, ['<40', '40-46', '46-51', '51-55', '55-60']];
citycoords['los angeles'] = [34.07483852023736, -118.32892140164431, 9, ['<38', '38-43', '43-50', '50-57', '57-67']];
citycoords['san francisco'] = [37.76532315179079, -122.44391726879564, 11, ['<32', '32-39', '39-44', '44-48', '48-53']];
citycoords['chicago'] = [41.854891400317754, -87.67040202741047, 10, ['<35', '35-43', '43-49', '49-53', '53-56']];
citycoords['atlanta'] = [33.7637757252088, -84.42633326861935, 11, ['<41', '41-46', '46-52', '52-57', '57-64']];
citycoords['houston'] = [29.748829215846698, -95.39474993214351, 10, ['<41', '41-48', '48-55', '55-59', '59-63']];
citycoords['dallas'] = [32.81421602557406, -96.79954559171003, 10, ['<42', '42-48', '48-55', '55-60', '60-67']];
citycoords['new york city'] = [40.6923291662734, -73.93271426982291, 10, ['<35', '35-40', '40-45', '45-49', '49-55']];


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


  map.addSource('mrt_philly', {
      type: 'raster',
      url: 'mapbox://xiaojianggis.1206n34k'
  });

  map.addLayer({
      'id': 'philly_ras',
      'type': 'raster',
      'source': 'mrt_philly'
  });



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


function addLegend(city){
    ranges = citycoords[city][3];
    // var ranges = ['32-39', '40-45', '45-50', '50-53', '53-58'];

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

  var city = document.getElementById("city").value;

  medium_cities = ["atlanta", "boston", "baltimore", "chicago", "dallas", "dc", "miami", "philadelphia", "san francisco", "seattle", "san diego"];
  big_cities = ['new york city', 'los angeles', 'houston']
  
  if (layerId == 'satellite') {
    map.setStyle('mapbox://styles/xiaojianggis/ckphr143t2wsk18s4lui33b5l');
  } else {
    if (medium_cities.includes(city, 0)) {
      map.setStyle('mapbox://styles/xiaojianggis/ckp7qfx284b7u18mlnu6bwssb');
    } else {
      map.setStyle('mapbox://styles/xiaojianggis/ckp7qe5kn07nh18oiilcmsun1');
    }  

  }
}



// update the show layer, when different city was selected
function updateMap(city) {
  console.log(city);
  console.log(citycoords);
  console.log(citycoords[city]);
  console.log(city=='philadelphia'); 


  var lat = citycoords[city][0];
  var lon = citycoords[city][1];
  var zoom = citycoords[city][2];

  console.log(citycoords[city][3]);

  map.setCenter([lon, lat]);
  map.setZoom(zoom);
  
  medium_cities = ["atlanta", "boston", "baltimore", "chicago", "dallas", "dc", "miami", "philadelphia", "san francisco", "seattle", "san diego"];
  big_cities = ['new york city', 'los angeles', 'houston']
  //judge whether to use large style or the medium city style layer
  if (medium_cities.includes(city, 0)) {
    map.setStyle('mapbox://styles/xiaojianggis/ckp7qfx284b7u18mlnu6bwssb');
  } else {
    map.setStyle('mapbox://styles/xiaojianggis/ckp7qe5kn07nh18oiilcmsun1');
  }

  document.getElementById('city').value = city;
  addLegend(city);
}

