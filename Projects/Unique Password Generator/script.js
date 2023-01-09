const upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerset = "abcdefghijklmnopqrstuvwxyz";
const numberset = "1234567890";
const symbolset = "!@#$%^&*~?";

//Selecting the various checkboxes

const upperdata = document.getElementById("uppercase");
const lowerdata = document.getElementById("lowercase");
const symboldata = document.getElementById("symbol");
const numberdata = document.getElementById("number");
const numberchrdata = document.getElementById("number-char");
const passmodeldata = document.getElementById("pass-word");


//taking a random value from dataset
const datafromset = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}


const generatedpassword = (password = "") => {
    if (upperdata.checked) {
        password += datafromset(upperset);
    }
    if (lowerdata.checked) {
        password += datafromset(lowerset);
    }
    if (numberdata.checked) {
        password += datafromset(numberset);
    }
    if (symboldata.checked) {
        password += datafromset(symbolset);
    }
    if (password.length <= numberchrdata.value) {
        return generatedpassword(password);
    }
    passmodeldata.innerText = truncateString(password, numberchrdata.value);
    // console.log(password);
}

generatedpassword();


document.getElementById("generate").addEventListener(
    "click",
    function () {
        generatedpassword();
    }
)


function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}