

function renderDirector(year, type) {
  d3.json(`/director/${year}/${type}`).then(data2 => {
    // var trace1 = {
    //   y: data2.map(row => row.director),
    //   x: data2.map(row => row.title).reverse(),
    //   text: data2.map(row => row.title).reverse().map(String),
    //   textposition: 'auto',
    //   type: "bar",
    //   orientation: "h",
    //   hoverinfo: 'none'

    // };
    // Create the Trace
    var trace1 = {
      // y: tvshowdata.map(row => row.rating),
      y: data2.filter(thing => thing.type = "TV Show").map(row => row.director),
      // x: tvshowdata.map(row => row.title).reverse(),
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
      // y: moviedata.map(row => row.rating),
      // x: moviedata.map(row => row.title).reverse(),
      y: data2.filter(thing => thing.type = "Movie").map(row => row.director),
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
      // title: "# Titles By Director",
      title: {
        text: '<b># Titles By Director</b>',
        font: {
          family: "arial",
          color: "#212529",
          size: 16
        }

        // font: {
        //   family: 'Courier New, monospace',
        //   size: 24
        // },

        // y: "1",
        // yanchor: "top"
      }, barmode: "stack",
      showlegend: false,
      // xaxis: { title: "Eye Color" },
      // yaxis: { title: "Flicker Frequency" }
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
    // var tvshowdata = data2.filter(obj => obj.type == 'TV Show');
    // var moviedata = data2.filter(obj => obj.type == 'Movie');

    var trace1 = {
      // y: tvshowdata.map(row => row.rating),
      y: data2.filter(thing => thing.type = "TV Show").map(row => row.rating),
      // x: tvshowdata.map(row => row.title).reverse(),
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
      // y: moviedata.map(row => row.rating),
      // x: moviedata.map(row => row.title).reverse(),
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
    // Create the Trace


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

        // font: {
        //   family: 'Courier New, monospace',
        //   size: 24
        // },

        // y: "1",
        // yanchor: "top"
      },
      // xaxis: { title: "Eye Color" },
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
    // Create the Trace


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

        // font: {
        //   family: 'Courier New, monospace',
        //   size: 24
        // },

        // y: "1",
        // yanchor: "top"
      }
      ,

      showlegend: true, height: 350,
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
    // var trace1 = {
    //   x: data2.map(row => row.release_year),
    //   y: data2.map(row => row.title),
    //   type: "bar"

    // };
    // Create the Trace
    var trace1 = {
      // y: tvshowdata.map(row => row.rating),
      x: data2.filter(thing => thing.type = "TV Show").map(row => row.release_year),
      // x: tvshowdata.map(row => row.title).reverse(),
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
      // y: moviedata.map(row => row.rating),
      // x: moviedata.map(row => row.title).reverse(),
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

        // font: {
        //   family: 'Courier New, monospace',
        //   size: 24
        // },

        // y: "1",
        // yanchor: "top"
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



      // yaxis: { title: "Flicker Frequency" }
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
    var myMap = L.map("titlesByCountry", {
      center: [
        0, 0
      ],
      zoom: 1,
      layers: [darkMap, earthquakes]
    });

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
        case value > 7:
          return "#ff2828";
        case value > 5:
          return "#f16966";
        case value > 3:
          return "#f7a9a8";
        case value > 1:
          return "#facbcb";
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

    // Get the tectonic plate data from tectonicplatesURL


    // Add legend
    var legend = L.control({
      position: "bottomright"
    });

    // // details for the legend
    // var legend = L.control({ position: "bottomright" });

    // legend.onAdd = function (map) {
    //   var div = L.DomUtil.create("div", "legend");
    //   div.innerHTML += "<h4>Magnitude</h4>";
    //   div.innerHTML += '<i style="background: #D90000"></i><span>>9</span><br>';
    //   div.innerHTML += '<i style="background: #ff2828"></i><span>7-9</span><br>';
    //   div.innerHTML += '<i style="background: #f16966"></i><span>5-7</span><br>';
    //   div.innerHTML += '<i style="background: #f7a9a8"></i><span>3-5</span><br>';
    //   div.innerHTML += '<i style="background: #facbcb"></i><span>1-3</span><br>';
    //   div.innerHTML += '<i style="background: #FFFFFF"></i><span><1</span><br>';

    //   return div;
    // };
    // legend.addTo(myMap);
  });
};

// function renderMap(year, type) {
//   d3.json(`/country/${year}/${type}`).then(data2 => {
//     console.log(data2)
//     // Create two layerGroups
//     var myMap = L.map("titlesByCountry", {
//       center: [-28.01, 153.4],
//       zoom: 13
//     });

//     // Adding a tile layer (the background map image) to our map
//     // We use the addTo method to add objects to our map
//     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//       tileSize: 512,
//       maxZoom: 18,
//       zoomOffset: -1,
//       id: "mapbox/streets-v11",
//       accessToken: API_KEY
//     }).addTo(myMap);

//     // var myMap = L.map("titlesByCountry", {
//     //   center: [
//     //     0, 0
//     //   ],
//     //   zoom: 3,
//     //   layers: [darkMap, earthquakes]
//     // });

//     // var earthquakes = L.layerGroup();
//     // // Define tile layers
//     // var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     //   maxZoom: 18,
//     //   id: "dark-v10",
//     //   accessToken: API_KEY
//     // });

//     // // var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     // //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     // //   maxZoom: 18,
//     // //   id: "mapbox.satellite",
//     // //   accessToken: API_KEY
//     // // });

//     // // var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     // //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     // //   tileSize: 512,
//     // //   maxZoom: 18,
//     // //   zoomOffset: -1,
//     // //   id: "mapbox/light-v10",
//     // //   accessToken: API_KEY
//     // // });

//     // // var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     // //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     // //   tileSize: 512,
//     // //   maxZoom: 18,
//     // //   zoomOffset: -1,
//     // //   id: "mapbox/outdoors-v11",
//     // //   accessToken: API_KEY
//     // // });

//     // // Define a baseMaps object to hold the base layers
//     // var baseMaps = {
//     //   "Dark Map": darkMap

//     // };

//     // var overlayMaps = {
//     //   "Earthquakes": earthquakes

//     // };
//     // // Create the map, giving it the darkmap and earthquakes layers to display on load


//     // // Create a layer control
//     // // Pass in the baseMaps and overlayMaps
//     // // Add the layer control to the map
//     // // L.control.layers(baseMaps, overlayMaps, {
//     // //   collapsed: false
//     // // }).addTo(myMap);





//     // // Determine the marker size by magnitude
//     // function markerSize(magnitude) {
//     //   return 2 * magnitude;
//     // };
//     // // Determine the marker color by depth
//     // function chooseColor(value) {
//     //   switch (true) {
//     //     case value > 9:
//     //       return "#D90000";
//     //     case value > 7:
//     //       return "#ff2828";
//     //     case value > 5:
//     //       return "#f16966";
//     //     case value > 3:
//     //       return "#f7a9a8";
//     //     case value > 1:
//     //       return "#facbcb";
//     //     default:
//     //       return "#FFFFFF";
//     //   }
//     // }

//     // // Create a GeoJSON layer containing the features array
//     // // Each feature a popup describing the place and time of the earthquake
//     // // L.geoJSON(data2, {
//     // //   pointToLayer: function (feature, latlng) {
//     // //     return L.circleMarker(latlng,
//     // //       // Set the style of the markers based on properties.mag
//     // //       {
//     // //         radius: markerSize(feature.properties.title),
//     // //         fillColor: chooseColor(feature.properties.title),
//     // //         fillOpacity: 0.9,
//     // //         color: "white",
//     // //         stroke: true,
//     // //         weight: 0.3
//     // //       }
//     // //     );
//     // //   },
//     // //   // onEachFeature: function (feature, layer) {
//     // //   //   layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
//     // //   //     + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
//     // //   // }
//     // // }).addTo(earthquakes);
//     // // // Sending our earthquakes layer to the createMap function
//     // earthquakes.addTo(myMap);

//     // // Get the tectonic plate data from tectonicplatesURL


//     // // Add legend
//     // var legend = L.control({
//     //   position: "bottomright"
//     // });

//     // // details for the legend
//     // var legend = L.control({ position: "bottomright" });

//     // legend.onAdd = function (map) {
//     //   var div = L.DomUtil.create("div", "legend");
//     //   div.innerHTML += "<h4>Magnitude</h4>";
//     //   div.innerHTML += '<i style="background: #D90000"></i><span>>9</span><br>';
//     //   div.innerHTML += '<i style="background: #ff2828"></i><span>7-9</span><br>';
//     //   div.innerHTML += '<i style="background: #f16966"></i><span>5-7</span><br>';
//     //   div.innerHTML += '<i style="background: #f7a9a8"></i><span>3-5</span><br>';
//     //   div.innerHTML += '<i style="background: #facbcb"></i><span>1-3</span><br>';
//     //   div.innerHTML += '<i style="background: #FFFFFF"></i><span><1</span><br>';

//     //   return div;
//     // };
//     // legend.addTo(myMap);
//   });
// };

//   var trace2 = {
//     x: data2.rating,
//     y: data2.title,
//     type: "bar",
//     transforms: [{
//       type: "aggregate",
//       groups: data2.title,
//       aggregations: [{
//         target: "y",
//         function: "avg",
//         enabled: true
//       }]
//     }]
//   };
//   // Create the Trace


//   // Create the data array for the plot
//   var data = [trace2];

//   // Define the plot layout
//   var layout = {
//     title: "Eye Color vs Flicker",
//     xaxis: { title: "Eye Color" },
//     yaxis: { title: "Flicker Frequency" }
//   };

//   // Plot the chart to a div tag with id "bar-plot"
//   Plotly.newPlot("titlesByYearReleased", data, layout);

//   console.log(data2);
// })


// function buildCharts(show_id) {

//   var colorlist = ['#56dd3b', '#3ad8bb', '#3ba5e2', '#3956db', '#6639db',
//     '#9f38e0', '#da36e2', '#93226d', '#701339', '#510811', '#443536', '#1c1919']
//   // Fetch the sample data for the plots
//   var url = `/samples/${show_id}`;
//   d3.json(url).then(function (response) {
//     const otu_ids = response.otu_ids;
//     const otu_labels = response.otu_labels;
//     const sample_values = response.sample_values;



// function thingy(release_year) {
//   var url = `/inventory/${release_year}`;
//   d3.json(url).then(function (response) {
//     const show_id = response.show_id;
//     const type = response.type;
//     const title = response.title;
//     const release_year = response.release_year;

//     /*    ========Build a Pie Chart======== */
//     var data = [{
//       values: release_year.slice(0, 10),
//       labels: show_id.slice(0, 10),
//       hovertext: release_year.slice(0, 10),
//       "type": "pie"
//     }]

//     var layout = {
//       title: "Top 10 bacterial species",
//       showlegend: true,
//       hoverdistance: 10,
//       colorway: colorlist
//     };

//     Plotly.newPlot("moviesVsTV", data, layout, { responsive: true });
//     /*  ==============END PIE ============== */
//   });
// }



// var renderTitlesByDirector = (years) => $.get(`/inventory/${years}`, (res) => {
//   var year = Object.keys(res);
//   var metricValue = Object.values(res);
//   var data = [
//     {
//       x: year,
//       y: metricValue,
//       type: 'bar',
//       marker: {
//         color: '#212529',
//         width: 1
//       }
//     }
//   ];
//   var layout = {
//     title: `${metric} Time Series`,
//     yaxis: {
//       title: `${metric} ($)`
//     },
//     xaxis: {
//       title: `Year`,
//       tickformat: 'd'
//     }
//   };

//   Plotly.newPlot('titlesByDirector', data, layout);
// })



// var renderTitlesByDirector = (metric, years) => $.get(`/api/titlesByDirector/${metric}/${years}`, (res) => {
//   var year = Object.keys(res);
//   var metricValue = Object.values(res);
//   var data = [
//     {
//       x: year,
//       y: metricValue,
//       type: 'bar',
//       marker: {
//         color: '#212529',
//         width: 1
//       }
//     }
//   ];
//   var layout = {
//     title: `${metric} Time Series`,
//     yaxis: {
//       title: `${metric} ($)`
//     },
//     xaxis: {
//       title: `Year`,
//       tickformat: 'd'
//     }
//   };

//   Plotly.newPlot('titlesByDirector', data, layout);
// })

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#yearSelector");

//   // Use the list of sample names to populate the select options
//   d3.json("/inventory/").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     thingy(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// $("#yearSelector").change(() => {
//   var years = $("#yearSelector").val();
//   var metric = $("#metricSelector").val();
//   renderTimeseries(metric, years);
//   renderCountry(metric, years);
//   renderChannel(metric, years);
//   renderProduct(metric, years);
// });

d3.select(window).on("load", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderType(year, type)
  renderYear(year, type)
  renderMap(year, type)
});

d3.select("#yearSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderType(year, type)
  renderMap(year, type)

});



d3.select("#metricSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderYear(year, type)
  renderMap(year, type)

});
