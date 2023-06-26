let input = document.querySelector('.input');
let butt = document.querySelector('.add');
let alltasks = document.querySelector('.alltasks');
let allclear = document.querySelector('.add-clear');
let search = document.querySelector('.search-bar');
butt.addEventListener('click', adding);
alltasks.addEventListener('click', remove);
allclear.addEventListener('click', removeall);
search.addEventListener('keyup', dos);

function adding() {

    let divisionlist = document.createElement("div");
    let ele = document.createElement("div");
    ele.classList.add("iop");
    let text = document.createTextNode(input.value);
    if (input.value === '') {
        input.placeholder="Please add your task";
        input.placeholder.style.fontWeight="700";
        return;
    }
    else{
        input.placeholder="Enter Task";
    }
    ele.appendChild(text);
    divisionlist.style.backgroundColor = "rgb(255, 219, 255)";
    divisionlist.style.borderRadius="15px";

    let byu = document.createElement("button");
    byu.style.borderRadius="1px";
    byu.classList.add("close-btn");
    let icon = document.createElement("img");

    icon.classList.add("close");
    icon.setAttribute("src", "close1.png");
    icon.style.width = "18px";
    icon.style.height = "18px";
    icon.classList.add('pointer');
    byu.appendChild(icon)
    divisionlist.appendChild(ele);
    divisionlist.appendChild(byu);
    divisionlist.classList.add("divl");
    alltasks.appendChild(divisionlist);
    input.value = '';
    saveData();
}

function remove(e) {
    if (e.target.classList.contains("close")) {        
        e.target.parentElement.parentElement.remove();
        saveData();
    }
    saveData();
}
function removeall() {
    alltasks.innerHTML = '';
}
function dos(e) {
    let text = e.target.value;
    document.querySelectorAll('.divl').forEach(
        function (task) {
            const items = task.firstChild.textContent;
            if (items.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = "";
            }
            else {
                task.style.display = "none";
            }
        }
    )
}

function saveData(){
    localStorage.setItem("data",alltasks.innerHTML);
}

function showTask(){
    alltasks.innerHTML = localStorage.getItem("data");
}

showTask();