// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
// var getData;

d3.json("samples.json").then((importedData) => {
    // console.log(importedData.map(data => data.otu_ids));
    var utoData = importedData;
    var sampleData = utoData.samples;

    console.log(sampleData);

    sortedSampleData = sampleData.map(d=>d).sort(function(a, b) {
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

    console.log(sampleData.map(d=>d.id));

    //   // Slice the first 10 objects for plotting
    var sampleValueSorted = sortedSampleData.map(d=>d.sample_values[0]).slice(0,10);
    var sampleOtuIdSorted = sortedSampleData.map(d=>d.otu_ids[0]).slice(0,10);
    //   var sampleOtuIdSorted = sampleOtuIdSorted.map(i => 'OTU: ' + i);
    console.log(sampleValueSorted);
    //   console.log(sampleIdsTopTen);


    function init() {
        var data = [{
            type: "bar",
            x: sampleValueSorted,
            //   y: sampleOtuIdSorted,
            labels: sampleOtuIdSorted,
            orientation: 'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'descending'
            }]
            }];
        
            var layout = {
            height: 500,
            width: 500,
            };


            Plotly.newPlot("bar", data, layout);    
    };  

    init();

//   // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);
//   // Function called by DOM changes
document.getElementById('#selDataset')
    .addEventListener("change", function(event){
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        console.log(dataset);
        // Initialize an empty array for the country's data
    
        var data = [];
        var individual = "";
        var sampleValue = [];
        var otuID = [];
        var otuLabel = [];
    
        for (var j = 0; j < sortedSampleData.length; j++){
            // console.log(sampleData[j]);
            if (dataset == sortedSampleData.map(d=>d.id)) {
    
                
                individual = sortedSampleData.map(d=>d.id);
                console.log(individual);
                otuLabel = sortedSampleData.map(d=>d.otu_labels);
                console.log(otuLabel);
                otuID = sortedSampleData.map(d=>d.otu_ids);
                console.log(otuID);
                sampleValue = sortedSampleData.map(d=>d.sample_value);
                console.log(SampleValue);
    
                var data = [{
                    x: sampleValue,
                  //   x: sampleIdsTopTen,
                    labels: otuID,
                    type: "bar",
                    orientation: 'h'
                  }];
            } else {
                console.log("error occurred");
            }    
            updatePlotly(data); 
        }
    });

// function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     console.log(dataset);
//     // Initialize an empty array for the country's data

//     var data = [];
//     var individual = "";
//     var sampleValue = [];
//     var otuID = [];
//     var otuLabel = [];

//     for (var j = 0; j < sampleData.length; j++){
//         // console.log(sampleData[j]);
//         if (dataset == sampleData.map(d=>d.id[j])) {

            
//             individual = sampleData.map(d=>d.id[j]);
//             console.log(individual);
//             otuLabel = sampleData.map(d=>d.otu_labels[j]);
//             console.log(otuLabel);
//             otuID = sampleData.map(d=>d.otu_ids[j]);
//             console.log(otuID);
//             sampleValue = sampleData.map(d=>d.sample_value[j]);
//             console.log(SampleValue);

//             var data = [{
//                 x: sampleValue,
//               //   x: sampleIdsTopTen,
//                 labels: otuID,
//                 type: "bar",
//                 orientation: 'h'
//               }];
//         } else {
//             console.log("error occurred");
//         }    
//     };
  
    // if (dataset == 'us') {
    //     data = us;
    // }
    // else if (dataset == 'uk') {
    //     data = uk;
    // }
    // else if (dataset == 'canada') {
    //     data = canada;
    // }
    // Call function to update the chart
//     updatePlotly(data); 
//     // console.log(sampleValue);
// };


// d3.selectAll("#selDataset").on("change", optionChanged);

//   // Update the restyled plot's values
  function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
  }
  
});


    // var sampleData = data.samples;
    // var values = (data.samples[0].sample_values);
    // console.log(values);
    // var sampleValuesID = sampleValues.map(row => row.sample_values);
    // var stock = data.dataset.dataset_code;
    // var startDate = data.dataset.start_date;
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 4);
    // console.log(sampleValuesID);

//     var trace1 = {
//       x: sampleData.map(row => row.otu_ids),
//       y: sampleData.map(row => row.sample_values),
//       text: sampleData.map(row => row.otu_labels),
//       name: "OTU",
//       type: "bar",
//       orientation: "h"
//     };
  
//    var chartData = [trace1];

//        var layout = {
//       title: "OTU",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };

//     Plotly.newPlot("bar", chartData, layout);
  
    // Sort the data array using the greekSearchResults value
    // data.sort(function(a, b) {
    //   return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
    // });
  
    // // Slice the first 10 objects for plotting
    // data = data.slice(0, 10);
  
    // // Reverse the array due to Plotly's defaults
    // data = data.reverse();
  
    // // Trace1 for the Greek Data
    // var trace1 = {
    //   x: data.map(row => row.greekSearchResults),
    //   y: data.map(row => row.greekName),
    //   text: data.map(row => row.greekName),
    //   name: "Greek",
    //   type: "bar",
    //   orientation: "h"
    // };
  
    // // data
    // var chartData = [trace1];
  
    // // Apply the group bar mode to the layout
    // var layout = {
    //   title: "Greek gods search results",
    //   margin: {
    //     l: 100,
    //     r: 100,
    //     t: 100,
    //     b: 100
    //   }
    // };
  
    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("plot", chartData, layout);
 

//   // Slice the first 10 objects for plotting
// slicedData = sortedByGreekSearch.slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse();

// // Trace1 for the Greek Data
// var trace1 = {
//   x: reversedData.map(object => object.greekSearchResults),
//   y: reversedData.map(object => object.greekName),
//   text: reversedData.map(object => object.greekName),
//   name: "Greek",
//   type: "bar",
//   orientation: "h"
// };

// // data
// var data = [trace1];

// // Apply the group bar mode to the layout
// var layout = {
//   title: "Greek gods search results",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("plot", data, layout);


  //dropdown
//   function init() {
//     var data = [{
//       values: us,
//       labels: labels,
//       type: "pie"
//     }];
  
//     var layout = {
//       height: 600,
//       width: 800
//     };
  
//     Plotly.newPlot("pie", data, layout);
//   }
  
//   // On change to the DOM, call getData()
//   d3.selectAll("#selDataset").on("change", getData);
  
//   // Function called by DOM changes
//   function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
//     var data = [];
  
//     if (dataset == 'us') {
//         data = us;
//     }
//     else if (dataset == 'uk') {
//         data = uk;
//     }
//     else if (dataset == 'canada') {
//         data = canada;
//     }
//     // Call function to update the chart
//     updatePlotly(data);
//   }
  
//   // Update the restyled plot's values
//   function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
//   }
  
//   init();