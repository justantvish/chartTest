export const mergeSort = (arr: number[]) => {
    if (arr.length <= 1) return arr;
  
    const middle = Math.floor(arr.length / 2);
  
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(mergeSort(left), mergeSort(right));
  }
  
  
  const merge = (left: [], right: []) => {
    const result: number[] = [];
    let leftIndex: number = 0;
    let rightIndex: number = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }