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
export function getBubbleSortAnimations(array){
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