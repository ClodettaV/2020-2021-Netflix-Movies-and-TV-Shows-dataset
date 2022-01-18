function buildMetadata(sample) {
  d3.json("netflix_movies_tvShows.csv").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
  
    });
  }
  
  function buildCharts(sample) {
  
  // Using `d3.json` to fetch the sample data for the plots
  d3.json("netflix_movies_tvshows.csv").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var result= resultsarray[0]
  
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;


    // Build a bubble Chart 


    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      
      };
  
      var DataBubble = [ 
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ['rgb(135,206,235)', 'rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(245,222,179)','rgb(255,218,185)'], 
          size: values,
          },
      }
    ];
  
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);
  
  
    //Build a bar chart

    var bar_data =[
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h",
        marker:{
            color: 'rgb(135,206,235)',
        }
      }
    ];
  
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
  }
   
  
  function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }
  
  function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }

  
  // Initialize the dashboard
  init();

// {% extends 'layout.html' %} {% block content %}
// <div>
//   <h1>The Analysis of the files selected are :</h1>
//   <canvas id="myChart" width="400" height="400"></canvas>
//   <script>
//     var ctx = document.getElementById("myChart").getContext("2d");
//     var dataframe = "{{ dataframe }}";
//     var myChart = new Chart(dataframe, {
//       type: "bar",
//       data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [
//           {
//             label: "# of Votes",
//             data: dataframe,
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//               "rgba(153, 102, 255, 0.2)",
//               "rgba(255, 159, 64, 0.2)",
//             ],
//             borderColor: [
//               "rgba(255, 99, 132, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(153, 102, 255, 1)",
//               "rgba(255, 159, 64, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   </script>
// </div>
// {% endblock %}