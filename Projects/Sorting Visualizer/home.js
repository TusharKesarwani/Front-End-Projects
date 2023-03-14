//initialize variables 
let array_of_bars = [];
let heightarray = [];
let f = 0;
let al = 200;
let container = document.getElementById("container");
let width=screen.width
let v=10;

if(width<=500)
al=100

for (let i = 0; i < al; i++) {
  heightarray[i] = Math.floor(Math.random() * 200) + 100;
  let element = document.createElement("div");
  element.id = `${++f}`;
  element.style.height = `${heightarray[i]}px`;
  element.style.borderLeft = "2px solid #f7941d";
  container.appendChild(element);
  array_of_bars.push(element);
}
// set array function to set the array
function setarray() {
  f = 0;
  heightarray = [];
  array_of_bars = [];
  al = document.getElementById("number_of_elements").value;
  //check screen width and respond accordingly
  let width=screen.width
  if(width<=500&&al>150)
  {
    alert("Size of array cannot be greater than 150")
    return;
  }
  if(width>500&&width<=900&&al>200)
  {
    alert("Size of array cannot be greater than 200")
    return;
  }
  if(width>900&&width<=1250&&al>400)
  {
    alert("Size of array cannot be greater than 400")
    return;
  }
  
  if(width>1250&&al>600)
  {
    alert("Size of array cannot be greater than 600")
    return;
  }

  container.innerHTML = " ";
  for (let i = 0; i < al; i++) {
    heightarray[i] = Math.floor(Math.random() * al) + 100;
    let element = document.createElement("div");
    element.id = `${++f}`;
    element.style.height = `${heightarray[i]}px`;
    element.style.borderLeft = "2px solid #f7941d";
    container.appendChild(element);
    array_of_bars.push(element);
  }
}
// set array function ends

// function to wait for some time
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

  // initializing variables to different buttons
  document.getElementById("bubble-sort").style.display="block"
  document.getElementById("count-sort").style.display="none"
  document.getElementById("merge-sort").style.display="none"
  document.getElementById("quick-sort").style.display="none"
  document.getElementById("insertion-sort").style.display="none"
  let bubble = document.getElementById("Bubble");
  let merger = document.getElementById("Merge");
  let quick = document.getElementById("Quick");
  let count_sort=document.getElementById("Count")
  let insertion_sort=document.getElementById("Insertion")
  let set=document.getElementById("set")
  // adding onclick event listener to different sort buttons
  bubble.addEventListener("click", async () => {
  document.getElementById("bubble-sort").style.display="block"
  document.getElementById("merge-sort").style.display="none"
  document.getElementById("quick-sort").style.display="none"
  document.getElementById("count-sort").style.display="none"
  document.getElementById("insertion-sort").style.display="none"
  bubble.disabled=true
  merger.disabled=true
  quick.disabled=true
  count_sort.disabled=true
  insertion_sort.disabled=true
  set.disabled=true
  slider[0].disabled=true
  await sorting()//wait for sorting to be completed
  bubble.disabled=false
  merger.disabled=false
  quick.disabled=false
  count_sort.disabled=false
  insertion_sort.disabled=false
  set.disabled=false
  slider[0].disabled=false
  });

  
  
  document.getElementById("merge-sort").style.display="none"
  document.getElementById("quick-sort").style.display="none"
  merger.addEventListener("click",async () => {
  document.getElementById("merge-sort").style.display="block"
  document.getElementById("bubble-sort").style.display="none"
  document.getElementById("quick-sort").style.display="none"
  document.getElementById("count-sort").style.display="none"
  document.getElementById("insertion-sort").style.display="none"
  bubble.disabled=true
  merger.disabled=true
  quick.disabled=true
  count_sort.disabled=true
  insertion_sort.disabled=true
  set.disabled=true
  slider[0].disabled=true
  await mergeSort(heightarray, 0, al - 1);//wait for sorting to be completed
  console.log(heightarray)
  bubble.disabled=false
  merger.disabled=false
  quick.disabled=false
  count_sort.disabled=false
  insertion_sort.disabled=false
  set.disabled=false
  slider[0].disabled=false
  });
  
   
   quick.addEventListener("click", async() => {  
    document.getElementById("quick-sort").style.display="block"
   document.getElementById("merge-sort").style.display="none"
   document.getElementById("bubble-sort").style.display="none"
   document.getElementById("count-sort").style.display="none"
   document.getElementById("insertion-sort").style.display="none"
   bubble.disabled=true
   merger.disabled=true
   quick.disabled=true
   count_sort.disabled=true
   insertion_sort.disabled=true
   set.disabled=true
   slider[0].disabled=true
   await quickSort(heightarray,0,al-1)//wait for sorting to be completed
   bubble.disabled=false
   merger.disabled=false
   quick.disabled=false
   count_sort.disabled=false
   insertion_sort.disabled=false
   set.disabled=false
   slider[0].disabled=false
   });
  

   
   count_sort.addEventListener("click", async() => {  
    document.getElementById("quick-sort").style.display="none"
   document.getElementById("merge-sort").style.display="none"
   document.getElementById("bubble-sort").style.display="none"
   document.getElementById("count-sort").style.display="block"
   document.getElementById("insertion-sort").style.display="none"
   bubble.disabled=true
   merger.disabled=true
   quick.disabled=true
   count_sort.disabled=true
   insertion_sort.disabled=true
   set.disabled=true
   slider[0].disabled=true
   await countsort(heightarray,al)//wait for sorting to be completed
   bubble.disabled=false
   merger.disabled=false
   quick.disabled=false
   count_sort.disabled=false
   insertion_sort.disabled=false
   set.disabled=false
   slider[0].disabled=false
   });

   
   insertion_sort.addEventListener("click", async () => {  
   document.getElementById("quick-sort").style.display="none"
   document.getElementById("merge-sort").style.display="none"
   document.getElementById("bubble-sort").style.display="none"
   document.getElementById("count-sort").style.display="none"
   document.getElementById("insertion-sort").style.display="block"
   bubble.disabled=true
   merger.disabled=true
   quick.disabled=true
   count_sort.disabled=true
   insertion_sort.disabled=true
   set.disabled=true
   slider[0].disabled=true
   await Insertionsort(heightarray,al)//wait for sorting to be completed
   bubble.disabled=false
   merger.disabled=false
   quick.disabled=false
   count_sort.disabled=false
   insertion_sort.disabled=false
   set.disabled=false
   slider[0].disabled=false
   });
   
   
  set.addEventListener("click", () => {
    setarray();
  });

  var slider=document.getElementsByClassName("slider");
  slider[0].oninput=function(){
  v=((100-this.value)/100)*20;
  console.log(typeof(v));
  }
