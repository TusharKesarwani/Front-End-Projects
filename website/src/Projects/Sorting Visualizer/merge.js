// Merge function of merge-sort
async function merge(heightarray, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;
  console.log(v);
  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++)
  {  await waitforme(v)//wait for miliseconds
     L[i] = heightarray[l + i];
  }
  for (var j = 0; j < n2; j++)
   {
   await waitforme(v)//wait for miliseconds
   R[j] = heightarray[m + 1 + j];
  }
  // Merging the arrays back into arr[l..r]
  var i = 0;
  var j = 0;
  // Initial index of merged subarray
  var k = l;
  await waitforme(v)//wait for  miliseconds

    while (i < n1 && j < n2) {
        await waitforme(v)//wait for  miliseconds
      if (L[i] <= R[j]) {
        heightarray[k] = L[i];
        document.getElementById(array_of_bars[k].id).style.height = `${L[i]}px`;
        document.getElementById(array_of_bars[k].id).style.borderLeft=`2px solid green`
        i++;
      } else {
        heightarray[k] = R[j];
        document.getElementById(array_of_bars[k].id).style.height = `${R[j]}px`;
        document.getElementById(array_of_bars[k].id).style.borderLeft=`2px solid green`
        j++;
      }
      k++;
    }
  
  // Copy the remaining elements of L[]

    while (i < n1) {
        await waitforme(v)//wait for miliseconds
      heightarray[k] = L[i];
      document.getElementById(array_of_bars[k].id).style.height = `${L[i]}px`;
      document.getElementById(array_of_bars[k].id).style.borderLeft=`2px solid green`
      i++;
      k++;
    }

  // Copy the remaining elements of R[]
    while (j < n2) {
        await waitforme(v)//wait for  miliseconds
      heightarray[k] = R[j];
      document.getElementById(array_of_bars[k].id).style.height = `${R[j]}px`;
      document.getElementById(array_of_bars[k].id).style.borderLeft=`2px solid green`
      j++;
      k++;
    }
}
async function mergeSort(heightarray, l, r) {
  if (l >= r) {
    return; //returns recursively
  }
  var m = l + parseInt((r - l) / 2);
   await mergeSort(heightarray, l, m);//wait till promise is returned
   await mergeSort(heightarray, m + 1, r);//wait till promise is returned
  await merge(heightarray, l, m, r);//wait till promise is returned
}



