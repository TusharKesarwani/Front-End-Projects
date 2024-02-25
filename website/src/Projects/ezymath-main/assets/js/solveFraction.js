document.addEventListener("DOMContentLoaded", function()
{
    renderMathInElement(document.body, {
        delimiters:[
            {left:'$', right:'$', display: false},
            {left:'\\[', right:'\\]', display: false}
        ]
    })
})

function solveFraction(num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var tempnum1 = num1;
    var tempnum2 = num2;
    var result = '';
    var temp = '';
    if (num1 % num2 == 0) {
        temp += `Dividing both Denominator and Numerator by ${num2}`;
        temp += `\\[\\frac{\\cancel{${num1}}}{\\cancel{${num2}}}=`;
        num1 /= num2;
        num2 = 1;
        temp += `\\frac{${num1}}{${num2}}\\]`;
        sol = `\\frac{${num1}}{${num2}}`;
    } else {
        var flag = 0;
        var sol = '';
        var max = 0;
        if (num1 > num2) {
            max = num1;
        } else {
            max = num2;
        }
        temp += `\\[\\frac{${num1}}{${num2}}\\]`;
        for (i = 2; i <= max; i++) {
            if (num1 % i == 0 && num2 % i == 0) {
                flag = 1;
                temp += `Dividing both Denominator and Numerator by ${i}`;
                temp += `\\[\\frac{\\cancel{${num1}}}{\\cancel{${num2}}} = `;
                num1 /= i;
                num2 /= i;
                sol = `\\frac{${num1}}{${num2}}`;
                temp += `\\frac{${num1}}{${num2}}\\]`;
            }
        }
    }

    if (flag == 0) {
        temp = '';
        temp += `Both Denominator and Numerator are not divisible by any Common Number`;
        sol = `\\frac{${num1}}{${num2}}`;
        result += `\\[\\frac{${tempnum1}}{${tempnum2}} = ${sol}\\]`
    } else {
        result += `\\[\\frac{${tempnum1}}{${tempnum2}} = ${sol}\\]`;
    }
    return { 'result': result, 'steps': temp };
}
function callSolveFraction() {
    var num1 = document.getElementById('num1solvefraction').value;
    var num2 = document.getElementById('num2solvefraction').value;

    var data = solveFraction(num1, num2);

    if (num2 == 0) {
        document.getElementById('outputsteps').innerHTML = "Invalid Operation , Denominator can't be zero of a Fraction";
        document.getElementById('outputresult').innerHTML = " ";
    }
    else {
        document.getElementById('outputsteps').innerHTML = data['steps'];
        document.getElementById('outputresult').innerHTML = data['result'];
    }
    renderMathInElement(document.getElementById('outputsteps'));
    renderMathInElement(document.getElementById('outputresult'));
}