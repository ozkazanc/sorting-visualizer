import {randomIntFromIntervals} from '../SortingVisualizer/SortingVisualizer.jsx'
// Merge Sort ======================================================
export function getMergeSortAnimation(array) {
    const animations = [];
    const auxArray = array.slice();

    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    
    return animations;
}

function mergeSortHelper(array, left, right, auxArray, animations) {
    if(left >= right) return;
    
    const middle = Math.floor((left + right) / 2);
    mergeSortHelper(auxArray, left, middle, array, animations);
    mergeSortHelper(auxArray, middle + 1, right, array, animations);
    
    doMerge(array, left, middle, right, auxArray, animations);   
}

function doMerge(array, left, middle, right, auxArray, animations){
  let k = left;
  let i = left;
  let j = middle + 1;
  while (i <= middle && j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxArray[i] <= auxArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxArray[i]]);
      array[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      array[k++] = auxArray[j++];
    }
  }
  while (i <= middle) {
    animations.push([i, i]);
    animations.push([i, i]);

    animations.push([k, auxArray[i]]);
    array[k++] = auxArray[i++];
  }
  while (j <= right) {
    animations.push([j, j]);
    animations.push([j, j]);
 
    animations.push([k, auxArray[j]]);
    array[k++] = auxArray[j++];
  }
}

// Bubble Sort ========================================================
export function getBubbleSortAnimation(array){
  const animations = [];
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(array, animations) {
	for(let i = 0; i < array.length; i++){
    let swapped = false;
		for(let j = 0; j < array.length - i - 1; j++){
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      
      if (array[j] > array[j + 1]){
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);

        let temp = array[j + 1];
				array[j + 1] = array[j];
        array[j] = temp;
        
        swapped = true;
      }

      else {
        animations.push([j, array[j]]);
        animations.push([j + 1, array[j + 1]]);
      }
    }
    if(!swapped) break;
	}
}

// Quick Sort =================================
export function getQuickSortAnimation(array){
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, left, right, animations){
  if(left < right) {
    // Put the pivot in the right place and have everything smaller than it to its left.
    let pivot = partition(array, left, right, animations);
    
    quickSortHelper(array, left, pivot - 1, animations);
    quickSortHelper(array, pivot + 1, right, animations);
  }
} 

function partition(array, left, right, animations){
  let pivotIdx = randomIntFromIntervals(left, right);
  let pivot = array[pivotIdx];
  
  let i = left - 1;
  
  for(let j = left; j <= right; j++){
    if(j == pivotIdx) continue;
    animations.push([j, pivotIdx]);
    animations.push([j, pivotIdx]);

    if(array[j] < pivot){
      i++;
      if(i == pivotIdx){
        pivotIdx = j;
      }
    
      animations.push([i, array[j]]);
      animations.push([j, array[i]]);

      //swap(array[i], array[j]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    else {
      animations.push([i + 1, array[i + 1]]);
      animations.push([j, array[j]]);
    }
  }

  // Push filler values into animation to skip them while processing
  animations.push([i + 1, pivotIdx]);
  animations.push([i + 1, pivotIdx]);
  animations.push([i + 1, array[pivotIdx]]);
  animations.push([pivotIdx, array[i + 1]]);
  
  //swap(array[i + 1], array[pivotIdx]);
  let temp = array[i + 1];
  array[i + 1] = array[pivotIdx];
  array[pivotIdx] = temp;
  
  return i + 1;
}

// This does not work since it's just swaps the values internally
function swap(a, b) {
  let temp = a;
  a = b;
  b = temp;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Heap Sort =================================
export function getHeapSortAnimation(array){
  const animations = [];
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(array, animations){
  
  // Build max heap
  for(let i = Math.floor(array.length / 2) - 1; i >= 0; i--){
    heapify(array, array.length, i, animations);
  }

  // One by one extract an element from heap
  for (let i = array.length - 1; i >= 0; i--){

    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([i, array[0]]);
    animations.push([0, array[i]]);
    
    // Move current root to end;
    let temp = array[i];
    array[i] = array[0];
    array[0] = temp;

    // Create the max heap on the reduced array
    heapify(array, i, 0, animations);
  }
}

// To heapify a subtree rooted with node rootIdx which is 
// an index in array. size is size of heap 
function heapify(array, size, rootIdx, animations){
  // Initialize largest as root
  let largest = rootIdx;
  let left = rootIdx * 2 + 1;
  let right = rootIdx * 2 + 2;

  if(left < size && array[left] > array[largest]){
    animations.push([left, largest]);
    animations.push([left, largest]);
    
    largest = left;
  }
  else {
    animations.push([-1, -1]);
    animations.push([-1, -1]);
  }

  if(right < size && array[right] > array[largest]){
    animations.push([right, largest]);
    animations.push([right, largest]);
    
    largest = right;
  }
  else {
    animations.push([-1, -1]);
    animations.push([-1, -1]);
  }

  if(largest != rootIdx) {
    animations.push([rootIdx, array[largest]]);
    animations.push([largest, array[rootIdx]]);
    
    // Swap root and largest
    let temp = array[rootIdx];
    array[rootIdx] = array[largest];
    array[largest] = temp;

    heapify(array, size, largest, animations);
  }
  else{
    animations.push([rootIdx, array[rootIdx]]);
    animations.push([largest, array[largest]]);
  }
}

// Selection Sort ===============================
export function getSelectionSortAnimation(array){
  const animations = [];
  selectionSortHelper(array, animations);
  return animations;
}

function selectionSortHelper(array, animations){
  for(let i = 0; i < array.length; i++){
    let jMin = i;
    
    for(let j = i + 1; j < array.length; j++){
      animations.push([j, jMin]);
      animations.push([j, jMin]);
      animations.push([-1, -1]);
      animations.push([-1, -1]);

      if(array[j] < array[jMin]){
        jMin = j;
      }
    }

    if(jMin != i) {
      animations.push([-1, -1]);
      animations.push([-1, -1]);
      animations.push([jMin, array[i]]);
      animations.push([i, array[jMin]]);

      let temp = array[i];
      array[i] = array[jMin];
      array[jMin] = temp;
    }
  }
}

// Insertion Sort ==================================
export function getInsertionSortAnimation(array){
  const animations = [];
  insertionSortHelper(array, animations);
  return animations;
}

function insertionSortHelper(array, animations){
  for(let i = 1; i < array.length; i++){
    let key = array[i];
    let j = i - 1;

    animations.push([j, i]);
    animations.push([j, i]);
  
    while(j >= 0 && array[j] > key){
      animations.push([j + 1, array[j]]);
      
      array[j + 1] = array[j];
      j--;

      animations.push([j, i]);
      animations.push([j, i]);
    }
    animations.push([j + 1, key]);

    array[j + 1] = key;
  }
}