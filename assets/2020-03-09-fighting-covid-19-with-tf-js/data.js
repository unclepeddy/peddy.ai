let handPointList = [];
let facePointList = [];
let labelList = [];
let collectedData = {
  'facePointList': facePointList,
  'handPointList': handPointList,
  'labelList': labelList
};

/*
 * Stages the given features and label in in-memory data 
 * structures; intended to be called many times, 
 * preeceding a call to save().
 */
function collectFeatures(facePoints, handPoints, label) {
  facePointList.push(facePoints);
  handPointList.push(handPoints);
  labelList.push(label);
  console.log("List at size: " + labelList.length);
}

/*
 * Writes an arbitrary structured or blob of data
 * to given filename, defaulting to 'console.json'.
 */
function save(data, filename){
  if(!data) {
    console.error('Console.save: No data')
    return;
  }

  if(!filename) filename = 'console.json'

  if(typeof data === "object"){
    data = JSON.stringify(data, undefined, 4)
  }

  var blob = new Blob([data], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}

// alias to console.save for easy saving from console
(function(console){
  console.save = save;
})(console)

export {collectFeatures, save}
