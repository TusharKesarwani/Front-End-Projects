export function getBubbleSortAnimations(array){
    const animations=[];
    if(array.length<=1)return array;
    bubbleSortHelper(array,animations);
    return animations;
  }  
  function bubbleSortHelper(array,animations){
    const n=array.Length;
    for(let i=0;i<n-1;i++){
      for(let j=0;j<n-i-1;j++){
        animations.push([j,j+1]);
        animations.push([j,j+1]);
        animations.push([j,j+1]);
        animations.push([j,j+1]);
        if(array[j]>array[j+1]){
          animations.push([j,array[j+1]]);
          animations.push([j+1,array[j]]);
          let temp=array[j];
          array[j]=array[j+1];
          array[j+1]=temp;
          
        }
      }
    }
  }