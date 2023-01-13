const usrNameInput = document.getElementById('name');
const usrAgeInput = document.getElementById('age');

window.addEventListener('load', () => {
    appendAddBtn();
    createDataOnStorage();
    let dataArray = getArrayFromStorage();
    if (dataArray.length == 0) {
        addToLocalStorage('Gabriel', 20);
        addToLocalStorage('Ana', 36);
        dataArray = getArrayFromStorage();
    }
    dataArray.forEach((obj) => {
        appendTableData(obj.name, obj.age);
    });
});

function editBtn() {
    const tdObj = this.parentElement.parentElement;
    const nameObj = tdObj.querySelector('.name-td');
    const ageObj = tdObj.querySelector('.age-td');
    usrNameInput.value = nameObj.textContent;
    usrAgeInput.value = ageObj.textContent;
    appendEditBtns.call(this);
}

function cancelFunc() {
    clearUsrInput();
    appendAddBtn();
}

function editFunc() {
    const TRData = getTRData.call(this);
    const ageField = TRData[1];
    const nameField = TRData[0];
    if (inputCheck(usrNameInput.value, usrAgeInput.value)) return;
    updateValueOnStorage(
        nameField.textContent,
        ageField.textContent,
        usrNameInput.value,
        usrAgeInput.value,
    );
    ageField.textContent = usrAgeInput.value;
    nameField.textContent = usrNameInput.value;
    cancelFunc();
}

function appendEditBtns() {
    const actionDiv = removeActionBtns();
    const updateBtnTemp = document.getElementsByTagName('template')[1];
    const btnsClone = updateBtnTemp.content.cloneNode(true);
    const updateBtn = btnsClone.querySelector('.btn-outline-primary');
    const cancelBtn = btnsClone.querySelector('.btn-outline-secondary');
    updateBtn.addEventListener('click', editFunc.bind(this));
    cancelBtn.addEventListener('click', cancelFunc);
    actionDiv.appendChild(btnsClone);
}

function removeActionBtns() {
    const btnDiv = document.querySelector('.action-btns');
    const btns = btnDiv.querySelectorAll('button');
    btns.forEach((item) => item.remove());
    return btnDiv;
}

function appendAddBtn() {
    const actionDiv = removeActionBtns();
    const addBtnTemp = document.getElementsByTagName('template')[2];
    const btnsClone = addBtnTemp.content.cloneNode(true);
    const addBtn = btnsClone.querySelector('.btn-outline-success');
    addBtn.addEventListener('click', defaultAddFunc);
    actionDiv.appendChild(btnsClone);
}

function deleteBtn() {
    const TRData = getTRData.call(this);
    const dataArray = getArrayFromStorage();
    const index = dataArray.findIndex((obj) => {
        return (
            obj.name == TRData[0].textContent &&
            obj.age == +TRData[1].textContent
        );
    });
    dataArray.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(dataArray));
    this.parentElement.parentElement.remove();
}

function defaultAddFunc() {
    appendTableData(usrNameInput.value, usrAgeInput.value);
    clearUsrInput();
}

function clearUsrInput() {
    usrNameInput.value = '';
    usrAgeInput.value = '';
}

function appendTableData(name, age) {
    if (inputCheck(name, age)) return;
    const templateClone = retrieveTemplate(name, age);
    addToLocalStorage(name, age);
    const table = document.querySelector('.tbody-content');
    table.appendChild(templateClone);
}

function inputCheck(name, age) {
    if (!name && !age) {
        alert('You need to fill both fields to add a new user!');
        cancelFunc();
        return true;
    }
    if (!name || name.match(/[0-9]/)) {
        cancelFunc();
        alert('Invalid name!');
        return true;
    }
    if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
        cancelFunc();
        alert('Invalid age!');
        return true;
    }
}

function addToLocalStorage(name, age) {
    if (checkIfExists(name, age)) return;
    const dataArray = getArrayFromStorage();
    const newEntry = {
        name: name,
        age: age,
    };
    dataArray.push(newEntry);
    localStorage.setItem('data', JSON.stringify(dataArray));
}

function retrieveTemplate(name, age) {
    if (inputCheck(name, age)) return;
    const temp = document.getElementsByTagName('template')[0];
    const tempClone = temp.content.cloneNode(true);
    const tempNameTr = tempClone.querySelector('.name-td');
    const tempAgeTr = tempClone.querySelector('.age-td');
    const delBtn = tempClone.querySelector('.btn-outline-secondary');
    const editButn = tempClone.querySelector('.btn-outline-primary');
    delBtn.addEventListener('click', deleteBtn);
    editButn.addEventListener('click', editBtn);
    tempNameTr.textContent = name;
    tempAgeTr.textContent = parseInt(age);
    return tempClone;
}

function checkIfExists(name, age) {
    const dataArray = getArrayFromStorage();
    const result = dataArray.find((object) => {
        return object.name == name && object.age == age;
    });
    return result;
}

function createDataOnStorage() {
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]));
    }
}

function getTRData() {
    const parentTr = this.parentElement.parentElement;
    const nameField = parentTr.querySelector('.name-td');
    const ageField = parentTr.querySelector('.age-td');
    return [nameField, ageField];
}

function updateValueOnStorage(name, age, newName, newAge) {
    const dataArray = getArrayFromStorage();
    const index = dataArray.findIndex((obj) => {
        return obj.name == name && obj.age == age;
    });
    dataArray[index].name = newName;
    dataArray[index].age = newAge;
    localStorage.setItem('data', JSON.stringify(dataArray));
}

function getArrayFromStorage() {
    const localStorageString = localStorage.getItem('data');
    const localStorageData = JSON.parse(localStorageString);
    return localStorageData;
}
