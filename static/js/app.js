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


//get data pull, set up dropdown menu, and call the initial plot
function setup() {
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
  initPlot(samples, metadata);
  });
};

//call the set up function
setup();


//initial chart set up
function initPlot(samples, metadata) {

  //Add OTU in front of OTU ID for y axis labels
  var y_array = samples[0].otu_ids.slice(0,10).reverse();
  var new_y_array = y_array.map(x => 'OTU ' + x);
  
    
  //initial bar chart
    var trace1 = {
      text:  samples[0].otu_labels.slice(0,10).reverse(),
      x: samples[0].sample_values.slice(0,10).reverse(),
      y: new_y_array,      
      orientation: 'h',
      name: 'OTU',
      type: 'bar',
    };

    var data = [trace1];
    var layout = {   
      title: {
        text: "Top 10 Bacteria Cultures Found"
      },       
      autosize: false,
      width: 600,
      height: 500,
      margin: {
        l: 100,
        r: 50,
        b: 100,
        t: 50,
        pad: 4
      }
    };

    Plotly.newPlot('bar', data, layout);

    //initial bubble chart
    var trace2 = {
      x: samples[0].otu_ids,
      y: samples[0].sample_values,
      text:  samples[0].otu_labels,
      mode: 'markers',
      marker: {
        color: samples[0].otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: samples[0].sample_values,
        sizeref: .1,
        sizemode: 'area'
      }
    };

    var dataBubble = [trace2];

    var layoutBubble = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 400,
      width: 1200
    };

    Plotly.newPlot('bubble', dataBubble, layoutBubble);

    // initial gauge chart
    var dataGauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata[0].wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] }
          // steps: [
          //   { range: [0, 250], color: "lightgray" },
          //   { range: [250, 400], color: "gray" }
          // ],
      }}
    ];
    
    var layoutGauge = { width: 500, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', dataGauge, layoutGauge);

    // Append Metadata for initial load
    var node = document.createElement("p");                 
    var textnode = document.createTextNode("ID: " + `${metadata[0].id}`); 
    var node2 = document.createElement("p");     
    var textnode2 = document.createTextNode("ETHNICITY: " + `${metadata[0].ethnicity}`); 
    var node3 = document.createElement("p");                 
    var textnode3 = document.createTextNode("GENDER: " + `${metadata[0].gender}`);
    var node4 = document.createElement("p");                 
    var textnode4 = document.createTextNode("AGE: " + `${metadata[0].age}`); 
    var node5 = document.createElement("p");                 
    var textnode5 = document.createTextNode("LOCATION: " + `${metadata[0].location}`); 
    var node6 = document.createElement("p");                 
    var textnode6 = document.createTextNode("BBTYPE: " + `${metadata[0].bbtype}`); 
    var node7 = document.createElement("p");                 
    var textnode7 = document.createTextNode("WFREQ: " + `${metadata[0].wfreq}`); 
    
    node.appendChild(textnode);       
    node2.appendChild(textnode2);  
    node3.appendChild(textnode3);   
    node4.appendChild(textnode4); 
    node5.appendChild(textnode5); 
    node6.appendChild(textnode6); 
    node7.appendChild(textnode7);               

    document.getElementById("sample-metadata").appendChild(node); 
    document.getElementById("sample-metadata").appendChild(node2);   
    document.getElementById("sample-metadata").appendChild(node3);  
    document.getElementById("sample-metadata").appendChild(node4);   
    document.getElementById("sample-metadata").appendChild(node5); 
    document.getElementById("sample-metadata").appendChild(node6); 
    document.getElementById("sample-metadata").appendChild(node7);
};

// update All plots and data when dropdown menu is changed
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

  // remove metadata from previous selection
    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
   }
  
   const container = document.querySelector('#sample-metadata');
   removeAllChildNodes(container);
   
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
   
    for (var i = 0 ; i < names.length ; i++){
      if (names[i] === dataset ) {

        // add OTU in front of OTU ID number

        var y_array = samples[i].otu_ids.slice(0,10).reverse();
        var new_y_array = y_array.map(x => 'OTU ' + x);

        // append updated metadata 
        var node = document.createElement("p");                 
        var textnode = document.createTextNode("ID: " + `${metadata[i].id}`); 
        var node2 = document.createElement("p");     
        var textnode2 = document.createTextNode("ETHNICITY: " + `${metadata[i].ethnicity}`); 
        var node3 = document.createElement("p");                 
        var textnode3 = document.createTextNode("GENDER: " + `${metadata[i].gender}`);
        var node4 = document.createElement("p");                 
        var textnode4 = document.createTextNode("AGE: " + `${metadata[i].age}`); 
        var node5 = document.createElement("p");                 
        var textnode5 = document.createTextNode("LOCATION: " + `${metadata[i].location}`); 
        var node6 = document.createElement("p");                 
        var textnode6 = document.createTextNode("BBTYPE: " + `${metadata[i].bbtype}`); 
        var node7 = document.createElement("p");                 
        var textnode7 = document.createTextNode("WFREQ: " + `${metadata[i].wfreq}`); 
        
        node.appendChild(textnode);       
        node2.appendChild(textnode2);  
        node3.appendChild(textnode3);   
        node4.appendChild(textnode4); 
        node5.appendChild(textnode5); 
        node6.appendChild(textnode6); 
        node7.appendChild(textnode7);               
    
        document.getElementById("sample-metadata").appendChild(node); 
        document.getElementById("sample-metadata").appendChild(node2);   
        document.getElementById("sample-metadata").appendChild(node3);  
        document.getElementById("sample-metadata").appendChild(node4);   
        document.getElementById("sample-metadata").appendChild(node5); 
        document.getElementById("sample-metadata").appendChild(node6); 
        document.getElementById("sample-metadata").appendChild(node7); 
     
        // bar chart update

        traceUpdate = {
          text: samples[i].otu_labels.slice(0,10).reverse(),
          x: samples[i].sample_values.slice(0,10).reverse(),
          y: new_y_array,              
          orientation: 'h',
          name: 'OTU',
          type: 'bar',
        }
    
        var data = [traceUpdate];
        var layout = {
          title: {
            text: "Top 10 Bacteria Cultures Found"
          },
          autosize: false,
          width: 600,
          height: 500,
          margin: {
            l: 100,
            r: 50,
            b: 100,
            t: 50,
            pad: 4
          }
        };

        Plotly.newPlot('bar', data, layout);
        
        
      //bubble chart update
        
        var trace2Update = {
          x: samples[i].otu_ids,
          y: samples[i].sample_values,
          text:  samples[i].otu_labels,
          mode: 'markers',
          marker: {
            color: samples[i].otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: samples[i].sample_values,
            sizeref: .1,
            sizemode: 'area'
          }
        };
    
        var dataBubbleUpdate = [trace2Update];
    
        var layoutBubble = {
          title: 'Bacteria Cultures Per Sample',
          showlegend: false,
          height: 400,
          width: 1200
        };
      
    // gauge chart update
      var dataGaugeUpdate = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata[i].wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] }
            // steps: [
            //   { range: [0, 250], color: "lightgray" },
            //   { range: [250, 400], color: "gray" }
            // ],
        }}
      ];
    }
      
      var layoutGaugeUpdate = { width: 500, height: 500, margin: { t: 0, b: 0 } };
      
    }
    Plotly.newPlot("bubble", dataBubbleUpdate, layoutBubble);
    Plotly.newPlot('gauge', dataGaugeUpdate, layoutGaugeUpdate);


  });
};

//event listener for menu, run plot update when there is a change
d3.selectAll("#selDataset").on("change", updatePlotly);