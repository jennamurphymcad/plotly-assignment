
d3.json("samples.json").then((importedData) => {

var utoData = importedData;
var sampleData = utoData.samples;



var allUsers = sampleData.map(d=>d.id);
var sampleValue = sampleData.map(d=>d.sample_values);
var otuIDs = sampleData.map(d=>d.otu_ids);
var otuLabels = sampleData.map(d=>d.otu_labels);
var listofUsers = [];
    // currentUser,
var currentSample_value = [];
var currentOTU_id = [];


console.log(sampleData.map(d=>d.id));
console.log(allUsers);
console.log(currentSample_value);
console.log(currentOTU_id);

  for (var i = 0; i < allUsers.length; i++ ){
    if (listofUsers.indexOf(allUsers[i]) === -1 ){
      listofUsers.push(allUsers[i]);
    }
  }
  
  function getUserData(chosenUser) {
//    currentSample_value = [];
currentOTU_id = [];
currentSample_value = [];
        
    for (var i = 0 ; i < allUsers.length ; i++){
        currentSample_value = []
        if ( allUsers[i] === chosenUser ) {
           currentSample_value.push(sampleValue[i]);
            currentOTU_id.push(otuIDs[i]);          
        } 

    }
  };
     
// var valueSample940 = sampleData.map(d=>d.sample_values[0]).slice(0,10);
// var otu_id_940 = sampleData.map(d=>d.otu_ids[0]).slice(0,10);

// var trace1 = {
//     x: valueSample940,
//     y: "OTU:" + otu_id_940,
//     labels: currentOTU_id,
//     type: "bar",
//     orientation: 'h',
//   //   transforms: [{
//   //       type: 'sort',
//   //       target: 'x',
//   //       order: 'descending'
//   //   }]
//   };

//   var data = [trace1];

//   var layout = {
//     title: 'Top 10 OTU for '
//   };

//   Plotly.newPlot('bar', data, layout);

// console.log(valueSample940);
// Default Country Data
setHorizontalPlot('940');
  
function setHorizontalPlot(chosenUser) {
    getUserData(chosenUser); 
    // console.log(currentSample_value);
    // console.log(currentOTU_id);
    var xValue = currentSample_value;
    var yValue = currentOTU_id;

    var trace1 = {
      x: xValue,
      y: yValue,
    //   labels: currentOTU_id,
      type: "bar",
      orientation: 'h',
    //   transforms: [{
    //       type: 'sort',
    //       target: 'x',
    //       order: 'descending'
    //   }]
    };

    var data = [trace1];

    var layout = {
      title: 'Top 10 OTU for '+ chosenUser
    };

    Plotly.newPlot('bar', data, layout);
};
  
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

// function demoInfo(textArray, selector) {
//     for (var i = 0; i < textArray.length;  i++) {
//         var currentOption = document.createElement('option');
//         currentOption.text = textArray[i];
//         selector.appendChild(currentOption);
//     }
// }

assignOptions(listofUsers, userSelector);

function updateUser(){
    // currentSample_value = [];
    // currentOTU_id = [];
    // currentSample_value = [];
    // currentOTU_id = [];

    setHorizontalPlot(userSelector.value);

    console.log(userSelector.value);
    // console.log(currentSample_value);
}
  
userSelector.addEventListener('change', updateUser, false);
});