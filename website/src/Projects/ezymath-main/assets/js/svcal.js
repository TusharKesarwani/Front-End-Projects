function slvcal() {
    a = parseFloat(document.getElementById("solvex").value);
    b = parseFloat(document.getElementById("solvey").value);
    c = parseFloat(document.getElementById("solvez").value);
    var output = document.getElementById("slvans");
    var ans = "";
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        ans += "Please enter all the values";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else if (b < 0) {
        ans += "The value of  X is ";
        ans += " " + a + " X " + b + "=" + c + " ";
        ans += " " + a + " X = " + (c - b) + " ";
        ans += " X = " + (c - b) / a + " ";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else {
        ans += "The value of X is ";
        ans += " " + a + "X  +  " + b + " =  " + c + " ";
        ans += " " + a + " X  =  " + (c - b) + " ";
        ans += "X  =  " + (c - b) / a + " ";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
}

function calcexslvcal() {
    a = document.getElementById("solvex");
    b = document.getElementById("solvey");
    c = document.getElementById("solvez");
    a.value = 3;
    b.value = 5;
    c.value = 14;
    slvcal();
}



// function calcexslvcal() {
//     a = document.getElementById("solvex");
//     b = document.getElementById("solvey");
//     c = document.getElementById("solvez");
//     a.value = 3;
//     b.value = 5;
//     c.value = 14;
//     slvcal();
// }
// function slvcal() {
//     a = parseFloat(document.getElementById("solvex").value);
//     b = parseFloat(document.getElementById("solvey").value);
//     c = parseFloat(document.getElementById("solvez").value);
//     var output = document.getElementById("slvans");
//     var ans = "";
//     if (isNaN(a) || isNaN(b) || isNaN(c)) {
//         ans += "\\[Please \\space enter \\space all \\space the \\space values \\]";
//         output.innerHTML = ans;
//         renderMathInElement(output);
//     }
//     else if (b < 0) {
//         ans += "\\[The \\space value \\space of \\space X \\space is \\]";
//         ans += "\\[" + a + "\\space X \\space " + b + "\\space = \\space " + c + " \\]";
//         ans += "\\[" + a + "\\space X \\space = \\space " + (c - b) + "\\]";
//         ans += "\\[\\space X \\space = \\space " + (c - b) / a + "\\]";
//         output.innerHTML = ans;
//         renderMathInElement(output);
//     }
//     else {
//         ans += "\\[The \\space value \\space of \\space X \\space is \\]";
//         ans += "\\[" + a + "\\space X \\space + \\space " + b + "\\space = \\space " + c + " \\]";
//         ans += "\\[" + a + "\\space X \\space = \\space " + (c - b) + "\\]";
//         ans += "\\[\\space X \\space = \\space " + (c - b) / a + "\\]";
//         output.innerHTML = ans;
//         renderMathInElement(output);
//     }
// }
