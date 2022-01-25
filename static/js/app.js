

function renderDirector(year, type) {
  d3.json(`/director/${year}/${type}`).then(data2 => {
    console.log(data2)

    // Create the Trace
    var trace1 = {
      y: data2.filter(thing => thing.type == "TV Show").map(row => row.director),
      x: data2.filter(thing => thing.type == "TV Show").map(row => row.title).reverse(),
      text: data2.filter(thing => thing.type == "TV Show").map(row => row.title).reverse().map(String),
      textposition: 'inside',
      type: "bar",
      orientation: "h",
      name: "TV Show",
      marker: {
        color: '#333333',
        line: {
          width: 1
        }
      },
    };
    var trace2 = {

      y: data2.filter(thing => thing.type == "Movie").map(row => row.director),
      x: data2.filter(thing => thing.type == "Movie").map(row => row.title).reverse(),
      text: data2.filter(thing => thing.type == "Movie").map(row => row.title).reverse().map(String),
      textposition: 'inside',
      type: "bar",
      orientation: "h",
      name: "Movie",
      marker: {
        color: 'red',
        line: {
          width: 1
        }
      }
    };

    // Create the data array for the plot
    var data = [trace1, trace2];

    // Define the plot layout
    var layout = {
      title: {
        text: '<b># Titles By Director</b>',
        font: {
          family: "arial",
          color: "#212529",
          size: 16
        }
      },
      barmode: "stack",
      showlegend: false,
      height: 350,
      margin: {
        l: 20,
        r: 20,
        b: 50,
        t: 50,
        pad: 0
      },
      yaxis: { ticksuffix: "     ", automargin: true }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("titlesByDirector", data, layout);
  })
};

function renderRating(year, type) {
  d3.json(`/rating/${year}/${type}`).then(data2 => {
    var trace1 = {
      y: data2.filter(thing => thing.type = "TV Show").map(row => row.rating),
      x: data2.filter(thing => thing.type = "TV Show").map(row => row.title).reverse(),
      text: data2.filter(thing => thing.type = "TV Show").map(row => row.title).reverse().map(String),
      textposition: 'inside',
      type: "bar",
      orientation: "h",
      name: "TV Show",
      marker: {
        color: '#333333',
        line: {
          width: 1
        }
      },
    };
    var trace2 = {
      y: data2.filter(thing => thing.type = "Movie").map(row => row.rating),
      x: data2.filter(thing => thing.type = "Movie").map(row => row.title).reverse(),
      text: data2.filter(thing => thing.type = "Movie").map(row => row.title).reverse().map(String),
      textposition: 'inside',
      type: "bar",
      orientation: "h",
      name: "Movie",
      marker: {
        color: 'red',
        line: {
          width: 1
        }
      }
    };

    // Create the data array for the plot
    var data = [trace1, trace2];

    // Define the plot layout
    var layout = {
      title: {
        text: '<b># Titles By Rating</b>',
        font: {
          family: "arial",
          color: "#212529",
          size: 16
        }
      },
      showlegend: false,
      barmode: 'stack', height: 350,
      margin: {
        l: 20,
        r: 20,
        b: 50,
        t: 50,
        pad: 0
      },
      yaxis: { ticksuffix: "     ", automargin: true }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("titlesByRating", data, layout);
  })
};


function renderType(year, type) {

  d3.json(`/type/${year}/${type}`).then(data2 => {
    var trace1 = {
      values: data2.map(row => row.title),
      labels: data2.map(row => row.type),
      type: "pie",
      marker: {
        colors: ["red", "#333333"]
      }
    };
    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
      title: {
        text: '<b># Movies Vs # TV Shows</b>',
        font: {
          family: "arial",
          color: "#212529",
          size: 16
        }
      },
      showlegend: true,
      height: 350,
      margin: {
        l: 20,
        r: 20,
        b: 50,
        t: 50,
        pad: 0
      },
      yaxis: { ticksuffix: "     ", automargin: true }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("moviesVsTV", data, layout);
  })
};


function renderYear(year, type) {
  d3.json(`/year/${year}/${type}`).then(data2 => {

    var trace1 = {
      x: data2.filter(thing => thing.type = "TV Show").map(row => row.release_year),
      y: data2.filter(thing => thing.type = "TV Show").map(row => row.title),
      text: data2.filter(thing => thing.type = "TV Show").map(row => row.title).map(String),
      textposition: 'inside',
      type: "bar",
      name: "TV Show",
      marker: {
        color: '#333333',
        line: {
          width: 1
        }
      },
    };
    var trace2 = {
      x: data2.filter(thing => thing.type = "Movie").map(row => row.release_year),
      y: data2.filter(thing => thing.type = "Movie").map(row => row.title),
      text: data2.filter(thing => thing.type = "Movie").map(row => row.title).map(String),
      textposition: 'inside',
      type: "bar",
      name: "Movie",
      marker: {
        color: 'red',
        line: {
          width: 1
        }
      }
    };

    // Create the data array for the plot
    var data = [trace1, trace2];

    // Define the plot layout
    var layout = {
      title: {
        text: '<b># Titles By Release Year</b>',
        font: {
          family: "arial",
          color: "#212529",
          size: 16
        }
      }, showlegend: false,
      barmode: "stack",
      xaxis: { title: "Release Year" }, height: 350,
      margin: {
        l: 20,
        r: 20,
        b: 50,
        t: 50,
        pad: 0
      },
      yaxis: { ticksuffix: "     ", automargin: true }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("titlesByYearReleased", data, layout);
  })
};


function renderMap(year, type) {
  d3.json(`/country/${year}/${type}`).then(data2 => {
    console.log(data2)
    // Create two layerGroups
    var earthquakes = L.layerGroup();
    // Define tile layers
    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });

    var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });

    var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/outdoors-v11",
      accessToken: API_KEY
    });

    // Define a baseMaps object to hold the base layers
    var baseMaps = {
      "Dark Map": darkMap,
      "Satellite Map": satelliteMap,
      "Grayscale Map": grayscaleMap,
      "Outdoors Map": outdoorsMap

    };

    var overlayMaps = {
      "Netflix Content": earthquakes

    };
    // Create the map, giving it the darkmap and earthquakes layers to display on load
    myMap = new L.map("titlesByCountry", {
      center: [
        0, 0
      ],
      zoom: 1,
      layers: [darkMap, earthquakes]
    });

    window.myMap = myMap
    // Create a layer control
    // Pass in the baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);

    // Determine the marker size by magnitude
    function markerSize(magnitude) {
      return (magnitude / 120) + 2;
    };
    // Determine the marker color by depth
    function chooseColor(value) {
      switch (true) {
        case value > 1:
          return "white";
        // case value > 7:
        //   return "#ff2828";
        // case value > 5:
        //   return "#f16966";
        // case value > 3:
        //   return "#f7a9a8";
        // case value > 1:
        //   return "#facbcb";
        default:
          return "#FFFFFF";
      }
    }

    // Create a GeoJSON layer containing the features array
    // Each feature a popup describing the place and time of the earthquake
    L.geoJSON(data2, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,
          // Set the style of the markers based on properties.mag
          {
            radius: markerSize(feature.properties.title),
            fillColor: chooseColor(feature.properties.title),
            fillOpacity: 1,
            color: "black",
            stroke: true,
            weight: 0.3
          }
        );
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b> " + feature.properties.country + "</b><hr><p># of content: " + feature.properties.title + "</p>");
      }
    }).addTo(earthquakes);
    // Sending our earthquakes layer to the createMap function
    earthquakes.addTo(myMap);

    return myMap
  });
};


var myMap = null;




d3.select(window).on("load", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderType(year, "Movie,TV Show")
  renderYear(year, type)
  myMap = renderMap(year, type)

});

d3.select("#yearSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderType(year, "Movie,TV Show")

  myMap.remove()

  d3.select("#titlesByCountry")._leaflet_id = null

  d3.select("#titlesByCountry").html('            <div id="titlesByCountry" style="width: 540px; height: 300px;"></div>')
  myMap = renderMap(year, type)

});

d3.select("#metricSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderYear(year, type)
  myMap.remove()

  d3.select("#titlesByCountry")._leaflet_id = null
  d3.select("#titlesByCountry").html('            <div id="titlesByCountry" style="width: 540px; height: 300px;"></div>')

  myMap = renderMap(year, type)
  renderType(year, "Movie,TV Show")


});
