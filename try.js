// let input = `housingcomplex,sector,block,tower,apartment|
// sector = 10 block|
// block = 3 tower|
// tower = 300 apartment|
// housingcomplex = 8 sector`;

let input = `university,college,class,student|
university = 6000 student|
college = 600 student|
class = 50 student`

let allInputs = input.split("|");
let orderedString = allInputs[0].split(",");
let orderedStringLength = orderedString.length;
let orderedList = {};
let outputString = '';

buildingOrderList()

if( ifRightOccurrenceImbalance()== false){
    for(let cnt = orderedStringLength - 1; cnt >= 0; --cnt ){
        if(orderedList[orderedString[cnt]].nextCount !== 0){
            orderedList[orderedString[cnt]].correctCount = orderedList[orderedString[cnt + 1]].nextCount == 0 ? orderedList[orderedString[cnt]].nextCount : orderedList[orderedString[cnt]].nextCount / orderedList[orderedString[cnt +1]].nextCount ;
        }
    }
}

for (let x = 0; x < orderedStringLength; x++) {    
    if(x == 0){
        orderedList[orderedString[x]].totalUpto = 1;
    }
    else{
        orderedList[orderedString[x]].totalUpto = orderedList[orderedString[x-1]].totalUpto * orderedList[orderedString[x-1]].correctCount; 
    }

    outputString += ` ${orderedList[orderedString[x]].totalUpto}  ${orderedString[x]} = `
}
outputString = outputString.substring(0, outputString.length - 2);

console.log(outputString);
console.log(orderedList);



function buildingOrderList() {
    for (let i = 0; i < orderedStringLength; i++) {
      orderedList[orderedString[i]] = {
        nextCount: 0,
        correctCount: 0,
        nextNode: orderedString[i + 1],
        totalUpto: 0,
        rightOccurrence:0
      };
    }
  
    for (let j = 1; j < allInputs.length; j++) {
      let subInput = allInputs[j].replace("\n", "").split(" ");
      orderedList[subInput[0]].nextCount = subInput[2];
      orderedList[subInput[0]].correctCount = subInput[2];
      orderedList[subInput[3]].rightOccurrence = orderedList[subInput[3]].rightOccurrence + 1;
    }
  
    // for (let x = 0; x < orderedStringLength; x++) {
    //   orderedList[orderedString[x]].nextNode = orderedString[x + 1];
    // }
  }
  
  function ifRightOccurrenceImbalance() {
    for (let x = 0; x < orderedStringLength; x++) {
      if (orderedList[orderedString[x]].rightOccurrence > 1) {
        return false;
      }
    }
  }
