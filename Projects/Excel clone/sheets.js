firstSheet.addEventListener("click", function(){
    for(let i = 0; i<sheetList.children.length;i++){
        sheetList.children[i].classList.remove("active-sheet");
    }
    firstSheet.classList.add("class", "active-sheet")
    db = sheetsDB[0];
    setUI();
})
createSheetIcon.addEventListener("click", function(){
    let childrenNum = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", childrenNum);
    newSheet.textContent = `Sheet ${childrenNum + 1}`;
    sheetList.appendChild(newSheet);
    initDB();
    //active switch
    newSheet.addEventListener("click",function(){
        for(let i = 0; i<childrenNum;i++){
            sheetList.children[i].classList.remove("active-sheet");
        }
        newSheet.classList.add("class", "active-sheet")
        let index = newSheet.getAttribute("sheetIdx");
        db = sheetsDB[index];
        setUI();
    })
})
function sheetOpenHandler(){
    let childrenNum = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", childrenNum);
    newSheet.textContent = `Sheet ${childrenNum + 1}`;
    sheetList.appendChild(newSheet);
    //active switch
    newSheet.addEventListener("click",function(){
        for(let i = 0; i<childrenNum;i++){
            sheetList.children[i].classList.remove("active-sheet");
        }
        newSheet.classList.add("class", "active-sheet")
        let index = newSheet.getAttribute("sheetIdx");
        db = sheetsDB[index];
        setUI();
    })
}

