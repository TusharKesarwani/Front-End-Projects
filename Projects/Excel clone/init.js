// **************************MENU ELEMENTS***************************
let fontSizeInput = document.querySelector(".font_size_input");
let fontFamilyInput = document.querySelector(".font_family_input");
let boldInput = document.querySelector(".fa-bold");
let ItalicInput = document.querySelector(".fa-italic");
let UnderlineInput = document.querySelector(".fa-underline");
let alignInput = document.querySelector(".alignment_container");
let backgroundHInput = document.querySelector(".background_color");
let backgroundInput = document.querySelector(".fa-fill-drip");
let textColorHInput = document.querySelector(".text_color");
let textColorInput = document.querySelector(".fa-font");
let createSheetIcon = document.querySelector(".newSheet");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
//*******************************************************************


// Creating cells (A-Z)
let topRow = document.querySelector(".top_row");
for (let i = 0; i < 26; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "cell");
    div.textContent = String.fromCharCode(65 + i); //ASCII for A-z
    topRow.appendChild(div)
}


// Creating Cells (1-100)
let leftCol = document.querySelector(".left_col")
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "cell");
    div.textContent = i;
    leftCol.appendChild(div)
}


//creating empty cells 
let grid = document.querySelector(".grid")
for (let i = 0; i < 100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 26; j++) {
        let div = document.createElement("div");
        div.setAttribute("class", "cell");
        // div.textContent=String.fromCharCode(65+j)+(i+1);
        div.setAttribute("contentEditable", "true")
        div.setAttribute("rId", i);
        div.setAttribute("cId", j);
        row.appendChild(div);
    }
    grid.appendChild(row);
}


// Creating DataBase of cell's values
let sheetsDB = []
initDB();
let db = sheetsDB[0];




// Clicking on cell will give address using rID, cID to address Bar
let allCells = document.querySelectorAll(".grid .cell");
let addressInput = document.querySelector(".address_input");
let formulaInput = document.querySelector(".formula_input")
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", function (e) {
        let r = allCells[i].getAttribute("rId");
        let c = allCells[i].getAttribute("cId");
        r = Number(r);
        c = Number(c);
        addressInput.value = String.fromCharCode(c + 65) + (r + 1);

        // *********** TWO WAY BINDING ***********
        let cellObject = db[r][c];
        let fontSize = cellObject.fontSize; //fontsize
        fontSizeInput.value = fontSize;
        let fontFamily = cellObject.fontFamily;//fontfamily
        fontFamilyInput.value = fontFamily;
        boldInput.classList.remove("selected");//bold
        if (cellObject.bold) {
            boldInput.classList.add("selected");
        }
        ItalicInput.classList.remove("selected");//italic
        if (cellObject.italic) {
            ItalicInput.classList.add("selected");
        }
        UnderlineInput.classList.remove("selected");//underline
        if (cellObject.underline) {
            UnderlineInput.classList.add("selected");
        }
        let options = alignInput.children;//allignment
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove("selected");
        }
        if (cellObject.halign) {
            for (let i = 0; i < options.length; i++) {
                let elementClasses = options[i].classList;
                let hAlignment = elementClasses[elementClasses.length - 1];
                if (hAlignment == cellObject.halign) {
                    elementClasses.add("selected");
                }
            }
        }
        if (cellObject.color == "") { // Text Color
            textColorInput.style.color = "black";
        }
        else{
            textColorInput.style.color = cellObject.color;
        }

        if (cellObject.backgroundColor == "") { // Background Color
            backgroundInput.style.color = "black";
        }
        else{
            backgroundInput.style.color = cellObject.backgroundColor;
        }
        

        formulaInput.value = cellObject.formula; //Formula Bar
    })
}


// Get First Cell
let firstCell = document.querySelector(".grid .cell[rid='0'][cid='0']");
firstCell.focus();
firstCell.click();


// Get RID CID from address
function getRidCid(address) {
    let ASCI = address.charCodeAt(0);
    let cid = (ASCI - 65);
    let rid = Number(address.substring(1)) - 1;
    return {
        rId: rid, cId: cid
    }
}

//  Initializing DataBase
function initDB() {
    let db = [];
    for (let i = 0; i < 100; i++) {
        let rowArr = []
        for (let j = 0; j < 26; j++) {
            let cellObject = {
                color: "",
                backgroundColor: "",
                fontFamily: "Arial",
                fontSize: 16,
                halign: "center",
                underline: false,
                bold: false,
                italic: false,
                value: "",
                formula: "",
                children: []
            }
            rowArr.push(cellObject);
        }
        db.push(rowArr);
    }
    sheetsDB.push(db);
}

 