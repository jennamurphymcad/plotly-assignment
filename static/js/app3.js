

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

function unpack(rows, index) {
   return rows.map(function(row) {
     return row[index];
   });
 }


function setup() {
  // var path = "samples.json"

d3.json("samples.json").then((importedData) => {

    var data = importedData;
    var names = importedData.names;
    var metadata = importedData.metadata;
    var samples = importedData.samples;
    // var sampleData = utoData.samples;
    // console.log(dataObjects);
    console.log(data);
    console.log(names);
    console.log(metadata);
    console.log(samples);


  var innerContainer = document.querySelector('.well'),
  // plotEl = innerContainer.querySelector('#bar'),
  userSelector = innerContainer.querySelector('#selDataset');
  demoInfo = innerContainer.querySelector('#sample-metadata')

  function assignOptions(names, selector) {
  for (var i = 0; i < names.length;  i++) {
    var currentOption = document.createElement('option');
    currentOption.text = names[i];
    selector.appendChild(currentOption);
    }
  }
  assignOptions(names, userSelector);
  initPlot(samples);
  });
};

setup();



// //initialize charts
function initPlot(samples) {

  // console.log(names);
  // console.log(metadata);
  // console.log(samples);

  // d3.json(path).then((importedData) => {

  //   var sampleData = importedData.samples;
  //   // var sampleData = utoData.samples;
  //   console.log(sampleData);
    
//     // var sampleDataInit_values = sampleData.map(d=>d.sample_values[1]).slice(0,10);
//     // var sampleDataInit_otu_ids = sampleData.map(d=>d.otu_ids[1]).slice(0,10);
//     // var sampleDataInit_otu_ids = sampleDataInit_otu_ids.map(i => 'OTU: ' + i);
//     //horizontal bar chart
    

    var trace1 = {
      text:  samples[0].otu_labels.slice(0,10).reverse(),
      x: samples[0].sample_values.slice(0,10).reverse(),
      y: samples[0].otu_ids.slice(0,10).reverse(),      
      orientation: 'h',
      name: 'OTU',
      type: 'bar',
//       // transforms: [{
//       //   type: 'sort',
//       //   target: 'x',
//       //   order: 'ascending',
//       // }],
//       mode:'markers',
//               marker:{color:'rgba(200, 50, 100, .7)', 
//               size:16},
//               hoverinfo: "sampleData.map(d=>d.otu_labels[1])",
    };

    var data = [trace1];
    var layout = {          
      autosize: false,
      width: 500,
      height: 500,
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
      }
    };

    Plotly.newPlot('bar', data, layout);

//     // Bubble Chart
//     // * Use `otu_ids` for the x values.
//     // * Use `sample_values` for the y values.
//     // * Use `sample_values` for the marker size.
//     // * Use `otu_ids` for the marker colors.
//     // * Use `otu_labels` for the text values.

    var trace2 = {
      x: samples[0].otu_ids,
      y: samples[0].sample_values,
      mode: 'markers',
      marker: {
        color: samples[0].otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: samples[0].sample_values,
        sizeref: .5,
        sizemode: 'area'
      }
    };

    var dataBubble = [trace2];

    var layoutBubble = {
      title: 'OTU ID',
      showlegend: false,
      height: 400,
      width: 1200
    };

    Plotly.newPlot('bubble', dataBubble, layoutBubble);

};






//   // This function is called when a dropdown menu item is selected
  
  
//   // document.getElementById('#selDataset')
//   //   .addEventListener("change", function(event){
//   // updatePlotly("940")
 
function updatePlotly() {
  d3.json("samples.json").then((importedData) => {

    var data = importedData;
    var names = importedData.names;
    var metadata = importedData.metadata;
    var samples = importedData.samples;
    // var sampleData = utoData.samples;
    // console.log(dataObjects);
    console.log(data);
    console.log(names);
    console.log(metadata);
    console.log(samples);
      

//     // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
  
//     // var bar = d3.selectAll("#bar").node();

    for (var i = 0 ; i < names.length ; i++){
      if (names[i] === dataset ) {

        traceUpdate = {
          text: samples[i].otu_labels.slice(0,10).reverse(),
          x: samples[i].sample_values.slice(0,10).reverse(),
          y: samples[i].otu_ids.slice(0,10).reverse(),              
          orientation: 'h',
          name: 'OTU',
          type: 'bar',
//           // transforms: [{
//           //   type: 'sort',
//           //   target: 'x',
//           //   order: 'ascending',
//           // }],
          
          // mode:'markers',
          //         marker:{color:'rgba(200, 50, 100, .7)', 
          //         size:16},
          //         hoverinfo: "sampleData.map(d=>d.otu_labels[i])",
        }
    
        var data = [traceUpdate];
        var layout = {
          autosize: false,
          width: 500,
          height: 500,
          margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
          }
        };

        Plotly.newPlot('bar', data, layout);
        
        
        
//         //  currentSample_value.push(sampleValue[i]);
//         //   currentOTU_id.push(otuIDs[i]);   
        
        var trace2Update = {
          x: samples[i].otu_ids,
          y: samples[i].sample_values,
          mode: 'markers',
          marker: {
            color: samples[i].otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: samples[i].sample_values,
            // // sizeref: .5,
            sizemode: 'area'
          }
        };
    
        var dataBubbleUpdate = [trace2Update];
    
        var layoutBubble = {
          title: 'OTU ID',
          showlegend: false,
          height: 400,
          width: 1200
        };
  

      }
    }
    Plotly.newPlot("bubble", dataBubbleUpdate, layoutBubble);
  });
};

d3.selectAll("#selDataset").on("change", updatePlotly);