
d3.json("samples.json").then((importedData) => {

var sampleData = importedData.samples;
// var sampleData = utoData.samples;

var sampleDataInit_values = sampleData.map(d=>d.sample_values[1]).slice(0,10);
var sampleDataInit_otu_ids = sampleData.map(d=>d.otu_ids[1]).slice(0,10);
// var sampleDataInit_otu_ids = sampleDataInit_otu_ids.map(i => 'OTU: ' + i);
//horizontal bar chart

var allUsers = sampleData.map(d=>d.id);
var listofUsers = [];

for (var i = 0; i < allUsers.length; i++ ){
  if (listofUsers.indexOf(allUsers[i]) === -1 ){
    listofUsers.push(allUsers[i]);
  }
}

//initialize charts
function init() {
    var trace1 = {
      labels:  sampleData.map(d=>d.otu_ids[1]).slice(0,10),
      x: sampleData.map(d=>d.sample_values[1]).slice(0,10),      
      orientation: 'h',
      name: 'OTU',
      type: 'bar',
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending',
      }],
      mode:'markers',
              marker:{color:'rgba(200, 50, 100, .7)', 
              size:16},
              hoverinfo: "sampleData.map(d=>d.otu_labels[1])",
    };

    var data = [trace1];
    var layout = {};
    Plotly.newPlot('bar', data, layout);

    // Bubble Chart
    // * Use `otu_ids` for the x values.
    // * Use `sample_values` for the y values.
    // * Use `sample_values` for the marker size.
    // * Use `otu_ids` for the marker colors.
    // * Use `otu_labels` for the text values.

    var trace2 = {
      x: sampleData.map(d=>d.otu_ids[1]),
      y: sampleData.map(d=>d.sample_values[1]),
      mode: 'markers',
      marker: {
        color: sampleData.map(d=>d.otu_ids[1]),
        opacity: [1, 0.8, 0.6, 0.4],
        size: sampleData.map(d=>d.sample_values[1]),
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

  d3.selectAll("#selDataset").on("change", updatePlotly);

  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
  
    var bar = d3.selectAll("#bar").node();

    for (var i = 0 ; i < allUsers.length ; i++){
      if (allUsers[i] === dataset ) {

        traceUpdate = {
          // labels:  sampleData.map(d=>d.otu_ids[i]).slice(0,10),
          x: sampleData.map(d=>d.sample_values[i]).slice(0,10),      
          orientation: 'h',
          name: 'OTU',
          type: 'bar',
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending',
          }],
          
          mode:'markers',
                  marker:{color:'rgba(200, 50, 100, .7)', 
                  size:16},
                  hoverinfo: "sampleData.map(d=>d.otu_labels[i])",
        }
    
        var data = [traceUpdate];
        var layout = {};
        Plotly.newPlot('bar', data, layout);
        //  currentSample_value.push(sampleValue[i]);
        //   currentOTU_id.push(otuIDs[i]);   
        
        var trace2Update = {
          x: sampleData.map(d=>d.otu_ids[i]),
          y: sampleData.map(d=>d.sample_values[i]),
          mode: 'markers',
          marker: {
            color: sampleData.map(d=>d.otu_ids[i]),
            opacity: [1, 0.8, 0.6, 0.4],
            size: sampleData.map(d=>d.sample_values[i]),
            // // sizeref: .5,
            // sizemode: 'area'
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
  };
  
  
    // Note the extra brackets around 'x' and 'y'
    // Plotly.restyle(bar, "values", [x]);
  // }



init();

//Create options for all Ids
var innerContainer = document.querySelector('.well'),
    // plotEl = innerContainer.querySelector('#bar'),
    userSelector = innerContainer.querySelector('#selDataset');
    demoInfo = innerContainer.querySelector('#sample-metadata')

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofUsers, userSelector);

});
