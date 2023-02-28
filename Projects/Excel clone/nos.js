//save
let downloadBtn = document.querySelector(".fa-save");
downloadBtn.addEventListener("click", function (e) {
    let a = document.createElement("a"); // creating anchor
    // File put -> DB array
    var StringCode = encodeURIComponent(JSON.stringify(sheetsDB));
    var dataStr = "data:text/json;charset=utf-8," + StringCode;
    a.href = dataStr; //dataStr will be downloaded
    a.download = "file.json";
    a.click();
    // var ws = XLSX.utils.json_to_sheet(db);
    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    // XLSX.writeFile(wb,"Myexcel.xlsx");
})
//open
let openBtn = document.querySelector(".fa-external-link-square-alt")
let openInput = document.querySelector(".open_input")
openBtn.addEventListener("click", function (e) {
    openInput.click();
})
openInput.addEventListener("change", function (e) {
    let filesArr = openInput.files;
    let file = filesArr[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', (event) => {
        let JSONdata = JSON.parse(event.target.result);
        sheetsDB = JSONdata;
        db = sheetsDB[0];
        setUI();
        setSheets();
    });
})
function setSheets(){
    for(let i=0; i<sheetsDB.length-1;i++){
        sheetOpenHandler();
    }
}
// new
newInput = document.querySelector(".fa-plus-square");
newInput.addEventListener("click", function(){
    var confirmNewSheet = confirm("Opening New Excel Sheet")
    if (confirmNewSheet){
        sheetsDB = [];
        initDB();    //db reset
        db = sheetsDB[0];
        setUI();
        setSheets();
    }
})
function setUI() {
for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            //setting all the properties on UI with rid and cid
            let cellObject = db[i][j];
            let tobeChangedCell = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            tobeChangedCell.innerText = cellObject.value;
            tobeChangedCell.style.color = cellObject.color;
            tobeChangedCell.style.backgroundColor = cellObject.backgroundColor;
            tobeChangedCell.style.fontFamily = cellObject.fontFamily;
            tobeChangedCell.style.fontSize = cellObject.fontSize+"px";
            tobeChangedCell.style.textAlign = cellObject.halign;
            tobeChangedCell.style.textDecoration = cellObject.underline==false? "none":"underline";
            tobeChangedCell.style.fontStyle = cellObject.italic==false? "normal":"italic";
            tobeChangedCell.style.fontWeight = cellObject.bold==false? "normal":"bold";
        }
    }
}
