import {randomIntFromIntervals} from '../SortingVisualizer/SortingVisualizer.jsx'
// Merge Sort ======================================================
export function getMergeSortAnimation(array) {
    if(array.lenght <= 1) return array;
    
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
  if(array.length <= 1) return array;

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
  if(array.length <= 1) return array;

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
  if (a.length != b.length) return false;

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