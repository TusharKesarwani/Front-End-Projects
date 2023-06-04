const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((item) => {
    item.onclick = () => {
        if(item.id =='clear'){
            display.innerText = '';
        }
        else if(item.id == 'backspace'){
            let string = display.innerText.toString();
            display.innerText = string.substr(0,string.length-1);
        }
        else if(display.innerText !='' && item.id == 'equal'){
            const t=display.innerText.indexOf('^')
            console.log(t)
            if(t!=-1){
                const l=display.innerText.slice(0,t);
                const R=display.innerText.slice(t+1);
                console.log(l)
                console.log(R)
                const res=l+"**"+R
                display.innerText = eval(res);
            }
            else{
                display.innerText = eval(display.innerText);

            }
        }
        else if(display.innerText =='' && item.id == 'equal'){
            display.innerText = 'Empty!';
            setTimeout(() => (display.innerText = ''),2000)
        }
        else{
            display.innerText += item.id;
        }
    }
})

const themeToggleBtn = document.querySelector('.theme');
const calculator = document.querySelector('.calculator');
const toggleIcon = document.querySelector('.toggler');
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark
}