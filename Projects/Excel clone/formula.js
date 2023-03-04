// // cell -> formula remove / value set 
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function cellHelper(e) {
        let content = allCells[i].textContent;
        let address = addressInput.value;
        let { rId, cId } = getRidCid(address);
        let cellObject = db[rId][cId];
        if (cellObject.value == content) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(address, cellObject.formula);
            cellObject.formula = "";
        }
        SolveUI(content, rId, cId);
    })
}

formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let cFormula = formulaInput.value;
        let address = addressInput.value;
        let { rId, cId } = getRidCid(address);
        let cellObject = db[rId][cId];
        if (cellObject.formula != cFormula) {
            removeFormula(address, cellObject.formula);
        }
        let value = evaluateFormula(cFormula);
        SolveUI(value, rId, cId);
        db[rId][cId].formula = cFormula;
        setFormula(address, cFormula);

    }
})

function evaluateFormula(formula) {
    let formulaA = formula.split(" "); //['(', 'A1', '+', 'A2' ,')']
    for (let i = 0; i < formulaA.length; i++) {
        let ASCI = formulaA[i].charCodeAt(0);
        if (ASCI >= 65 && ASCI <= 90) { // A1 and A2
            let { rId, cId } = getRidCid(formulaA[i]);
            let value = db[rId][cId].value;
            formula = formula.replace(formulaA[i], value); // (A1+A2) converted to (10+20)
        }
    }
    let result = eval(formula); //Built in Evaluate function to evalutes maths
    return result;
}
function SolveUI(value, rId, cId) {
    let tobeChangedCell = document.querySelector(`.grid .cell[rid='${rId}'][cid='${cId}']`);
    tobeChangedCell.textContent = value;
    db[rId][cId].value = value;

    
    let childrenA = db[rId][cId].children;
    for(let i=0; i<childrenA.length; i++){
        let chRidCid = getRidCid(childrenA[i]);
        let chCellObj = db[chRidCid.rId][chRidCid.cId];
        let value= evaluateFormula(chCellObj.formula);
        SolveUI(value, chRidCid.rId, chRidCid.cId)
    }
}

//to set a cell as children of a cell
function setFormula(address, formula) {
    let formulaA = formula.split(" "); //['(', 'A1', '+', 'A2' ,')']
    for (let i = 0; i < formulaA.length; i++) {
        let ASCI = formulaA[i].charCodeAt(0);
        if (ASCI >= 65 && ASCI <= 90) { // A1 and A2
            let parentObj = getRidCid(formulaA[i]);
            let children = db[parentObj.rId][parentObj.cId].children;
            children.push(address);
        }
    }
}

//  to set a cell as children of a cell jispe depenedent 
function removeFormula(address, formula) {
    // console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaEntities = formula.split(" ");
    // [(,A1,+,A2,)]
    // console.log(formulaEntities);
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentrcObj = getRidCid(formulaEntities[i]);
            // db -> value
            let children = db[parentrcObj.rId][parentrcObj.cId].children;
            let idx = children.indexOf(address);
            children.splice(idx, 1);
            // replace in formula
        }
    }
}
