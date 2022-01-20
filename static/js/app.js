// var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
//   "Brown", "Brown", "Brown", "Green", "Green",
//   "Green", "Green", "Green", "Blue", "Blue",
//   "Blue", "Blue", "Blue", "Blue"];
// var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
//   25.7, 24.5, 26.4, 24.2, 28, 26.9,
//   29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// // Create the Trace
// var trace1 = {
//   x: eyeColor,
//   y: eyeFlicker,
//   type: "bar"
// };

// // Create the data array for the plot
// var data = [trace1];

// // Define the plot layout
// var layout = {
//   title: "Eye Color vs Flicker",
//   xaxis: { title: "Eye Color" },
//   yaxis: { title: "Flicker Frequency" }
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("moviesVsTV", data, layout);

function renderDirector(year, type) {
  d3.json(`/director/${year}/${type}`).then(data2 => {
    var trace1 = {
      y: data2.map(row => row.director),
      x: data2.map(row => row.title).reverse(),
      type: "bar",
      orientation: "h"

    };
    // Create the Trace


    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
      title: "Eye Color vs Flicker",
      xaxis: { title: "Eye Color" },
      yaxis: { title: "Flicker Frequency" }
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
      type: "bar",
      orientation: "h"

    };
    var trace2 = {
      y: data2.filter(thing => thing.type = "Movies").map(row => row.rating),
      x: data2.filter(thing => thing.type = "Movies").map(row => row.title).reverse(),
      type: "bar",
      orientation: "h"

    };
    // Create the Trace


    // Create the data array for the plot
    var data = [trace1, trace2];

    // Define the plot layout
    var layout = {
      title: "Eye Color vs Flicker",
      xaxis: { title: "Eye Color" },
      yaxis: { title: "Flicker Frequency" },
      barmode: 'stack'
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("titlesByRating", data, layout);
  })
};

//     /*    ========Build a Pie Chart======== */
//     var data = [{
//       values: sample_values.slice(0, 10),
//       labels: otu_ids.slice(0, 10),
//       hovertext: otu_labels.slice(0, 10),
//       "type": "pie"
//     }]

//     var layout = {
//       title: "Top 10 bacterial species",
//       showlegend: true,
//       hoverdistance: 10,
//       colorway: colorlist
//     };

//     Plotly.newPlot("moviesVsTV", data, layout, { responsive: true });
//     console.log("hi");
/*  ==============END PIE ============== */
function renderType(year, type) {
  d3.json(`/type/${year}/${type}`).then(data2 => {
    var trace1 = {
      values: data2.map(row => row.title),
      labels: data2.map(row => row.type),
      type: "pie"

    };
    // Create the Trace


    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
      title: "Top 10 bacterial species",

      showlegend: true

    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("moviesVsTV", data, layout);
  })
};


function renderYear(year, type) {
  d3.json(`/year/${year}/${type}`).then(data2 => {
    var trace1 = {
      x: data2.map(row => row.release_year),
      y: data2.map(row => row.title),
      type: "bar"

    };
    // Create the Trace


    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
      title: "Eye Color vs Flicker",
      xaxis: { title: "Eye Color" },
      yaxis: { title: "Flicker Frequency" }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("titlesByYearReleased", data, layout);
  })
};
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
});

d3.select("#yearSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderType(year, type)
});



d3.select("#metricSelector").on("change", () => {
  var year = d3.select("#yearSelector").node().value
  var type = d3.select("#metricSelector").node().value
  renderDirector(year, type)
  renderRating(year, type)
  renderYear(year, type)
});
