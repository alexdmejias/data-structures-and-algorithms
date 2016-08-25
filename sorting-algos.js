const random = require('random-array');

const test1 = [5,4,3,2,1,0,4];

function ArrayList(debug) {
  const swap = function(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    if (debug) {
      console.log('swapping:', index1, index2, '=>', array);
    }
  }

  const shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

  }

  this.run = function(algo, param) {
    console.log(algo);
    console.time(algo);
    this[algo](param);
    console.log(algo);
    console.timeEnd(algo)
  }

  this.insert = function(item) {
    array.push(item);
  }

  this.toString = function(param) {
    return param.toString();
  }

  this.bubbleSort = function(param) {
    const len = param.length;

    for(let i = 0; i < len; i++) {
      for(let h = 0; h < len - 1 -i; h++) {
        if (param[h] > param[h + 1]) {
          swap(param, h, h + 1);
        }
      }
    }
    shuffle(param);
  }

  this.selectiveSort = function(param) {
    const len = param.length;
    let lowestIndex
      
    for(let i = 0; i < len - 1; i++) {
      lowestIndex = i;

      for(let h = i; h < len; h++) {
        if (param[lowestIndex] > param[h]) {
          lowestIndex = h;
        }
        swap(param, i, lowestIndex)
      }
    }

  }

  this.insertionSort = function(param) {
    const len = param.length;
    let j, currValue;
    for (let i = 1; i < len; i++) {
      j = i;
      currValue = param[i];

      while (j > 0 && param[j - 1] > currValue) {
        param[j] = param[j - 1]
        j--;
      }

      param[j] = currValue //? ?? ? ??!?!
    }
  }

  this.splitter = function(param) {
    const len = param.length;
    const middle = Math.ceil(len / 2);
    let leftArr,
      rightArr;
    
    // if we only have one element, we have already cycled through all the 
    // elements
    if (len === 1) {
      return param;
    }
    
    // split the results into the left and right arrays
    leftArr = param.slice(0, middle);
    rightArr = param.slice(middle, len);

    // call the function that will merge the resulting arrays in a sorted order
    return this.merge(this.splitter(leftArr), this.splitter(rightArr));
  }

  this.merge = function(leftArr, rightArr) {
    let newArr = [];
    let leftIndex = 0; 
    let rightIndex = 0; 

    while(leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        newArr.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        newArr.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }

    // push the remaining items to the array
    while(leftIndex < leftArr.length) {
      newArr.push(leftArr[leftIndex]);
      leftIndex++;
    }

    // push the remaining items to the array
    while(rightIndex < rightArr.length) {
      newArr.push(rightArr[rightIndex]);
      rightArr++;
    }

    return newArr;
  }


}

const bubble = new ArrayList();
const maxNums = 10;
const bubbleRandom = random(1,1000).oned(maxNums, {round: true});
bubble.run('bubbleSort', bubbleRandom);
console.log('------');
const selectiveRandom = random(1,1000).oned(maxNums, {round: true});
bubble.run('selectiveSort', selectiveRandom);
console.log('------');
const insertionRandom = random(1,1000).oned(maxNums, {round: true});
bubble.run('insertionSort', insertionRandom);
console.log('------');
console.time('mergingSort');
const mergeRandom = random(1,1000).oned(maxNums, {round: true});
console.log('mergingSort');
const merged = bubble.splitter(mergeRandom);
console.log('mergingSort:');
console.timeEnd('mergingSort');
