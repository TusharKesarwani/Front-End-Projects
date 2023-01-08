



let input = document.querySelector('.input');
let butt = document.querySelector('.add');
let alltasks = document.querySelector('.alltasks');
let allclear = document.querySelector('.add-clear');
let search = document.querySelector('.search-bar');
 butt.addEventListener('click', adding);
 alltasks.addEventListener('click', remove);
 allclear.addEventListener('click', removeall);
search.addEventListener('keyup', dos);



function adding(){
    
    let divisionlist = document.createElement("div");
    let ele=document.createElement("div");
    ele.classList.add("iop");
    let text=document.createTextNode(input.value);
    if(input.value===''){
        alert("Please add your task");
        return;
    }
    ele.appendChild(text);

    let byu =document.createElement("button");
    byu.classList.add("close-btn");
     let icon=document.createElement("img");
    
    icon.classList.add("close");
    icon.setAttribute("src","close1.png");
    icon.style.width="15px";
    byu.appendChild(icon)
    divisionlist.appendChild(ele);
    divisionlist.appendChild(byu);
    divisionlist.classList.add("divl");
    alltasks.appendChild(divisionlist);
    input.value='';
}

function remove(e){
     if(e.target.classList.contains("close")){
        if(confirm("are you sure?")){
          e.target.parentElement.parentElement.remove();
        }       
}
}
function removeall (){
    alltasks.innerHTML='';
}
function dos(e){
    let text = e.target.value;
    document.querySelectorAll('.divl').forEach(
        function(task){
              const items = task.firstChild.textContent;
            if(items.toLocaleLowerCase().indexOf(text) != -1){
              
                task.style.display ="";
             }
              else{ 
              
                 task.style.display ="none";
            }
    })
}