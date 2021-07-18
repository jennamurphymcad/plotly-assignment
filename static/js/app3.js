
d3.json("samples.json").then((importedData) => {

var sampleData = importedData.samples;
// var sampleData = utoData.samples;

var sampleDataInit_values = sampleData.map(d=>d.sample_values[1]).slice(0,10);
var sampleDataInit_otu_ids = sampleData.map(d=>d.otu_ids[1]).slice(0,10);
var sampleDataInit_otu_ids = sampleDataInit_otu_ids.map(i => 'OTU: ' + i);
//horizontal bar chart

var allUsers = sampleData.map(d=>d.id);
var listofUsers = [];

for (var i = 0; i < allUsers.length; i++ ){
  if (listofUsers.indexOf(allUsers[i]) === -1 ){
    listofUsers.push(allUsers[i]);
  }
}

console.log(sampleDataInit_values);
console.log(sampleDataInit_otu_ids);

function init() {
    var trace1 = {
      // y: sampleData.map(d=>d.otu_ids[1]).slice(0,10),
      x: sampleData.map(d=>d.sample_values[1]).slice(0,10),
      orientation: 'h',
      name: 'OTU',
      type: 'bar',
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending'
    }]
    };

    var data = [trace1];

    var layout = {};

    Plotly.newPlot('bar', data, layout);


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

init();

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