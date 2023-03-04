// Font Size
fontSizeInput.addEventListener("change",function(){
    let fontSize = fontSizeInput.value;
    let address = addressInput.value;
    let id=getRidCid(address);
    let tobeChangedCell = document.querySelector
        (`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.fontSize = fontSize+"px";
    db[`${id.rId}`][`${id.cId}`].fontSize = fontSize;
});

// Font Family
fontFamilyInput.addEventListener("change",function(){
    let fontFamily = fontFamilyInput.value;
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector
        (`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.fontFamily = fontFamily;
    db[`${id.rId}`][`${id.cId}`].fontFamily = fontFamily;
});

// Bold
boldInput.addEventListener("click",function(){
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.fontWeight = "bold";
    boldInput.classList.add("selected");
    let cellObject = db[`${id.rId}`][`${id.cId}`];
    if(cellObject.bold){
        tobeChangedCell.style.fontWeight = "normal";
        boldInput.classList.remove("selected");
        cellObject.bold=false;
    }
    else{
        tobeChangedCell.style.fontWeight = "bold";
        boldInput.classList.add("selected");
        cellObject.bold=true;
    }
});

//Italic
ItalicInput.addEventListener("click",function(){
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.fontStyle = "italic";
    ItalicInput.classList.add("selected");
    let cellObject = db[`${id.rId}`][`${id.cId}`];
    if(cellObject.italic){
        tobeChangedCell.style.fontStyle = "normal";
        ItalicInput.classList.remove("selected");
        cellObject.italic=false;
    }
    else{
        tobeChangedCell.style.fontStyle = "italic";
        ItalicInput.classList.add("selected");
        cellObject.italic=true;
    }

});

//UnderLine
UnderlineInput.addEventListener("click",function(){
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.textDecoration = "underline";
    UnderlineInput.classList.add("selected");
    let cellObject = db[`${id.rId}`][`${id.cId}`];
    if(cellObject.underline){
        tobeChangedCell.style.textDecoration = "none";
        UnderlineInput.classList.remove("selected");
        cellObject.underline=false;
    }
    else{
        tobeChangedCell.style.textDecoration = "underline";
        UnderlineInput.classList.add("selected");
        cellObject.underline=true;
    }

});

// Alignment
alignInput.addEventListener("click",function(e){
    if(e.target !== alignInput){
        let classesArr = e.target.classList;
        let hAlignment = classesArr[classesArr.length - 1];
        let address = addressInput.value;
        let id =getRidCid(address);
        let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
        tobeChangedCell.style.textAlign = hAlignment;
        let options = alignInput.children;
        for( let i=0; i<options.length; i++){
            options[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
        let cellObject = db[`${id.rId}`][`${id.cId}`];
        cellObject.hAlign=hAlignment;
    }
});

//Colors
backgroundInput.addEventListener("click", function (e){
    backgroundHInput.click();        //dom helping hidden click to trigger
})
backgroundHInput.addEventListener("change", function(e){
    let color = backgroundHInput.value;
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.backgroundColor = color;
    backgroundInput.style.color = color;
    db[`${id.rId}`][`${id.cId}`].backgroundColor = color;
})

textColorInput.addEventListener("click", function (e){
    textColorHInput.click();        //dom helping hidden click to trigger
})
textColorHInput.addEventListener("change", function(e){
    let color = textColorHInput.value;
    let address = addressInput.value;
    let id =getRidCid(address);
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${id.rId}'][cid='${id.cId}']`);
    tobeChangedCell.style.color = color;
    textColorInput.style.color = color;
    db[`${id.rId}`][`${id.cId}`].color = color;
})
