let string = "";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        // console.log(e.target)
        if (e.target.innerHTML == 'AC') {
            string = '';
            document.querySelector('input').value = string;
        }
        else if (e.target.innerHTML == '=') {
            try {
                string = eval(string);
                document.querySelector('input').value = string;
            } catch {
                display.innerText = 'Error!';
            }
        }
        else if (e.target.innerHTML == '←') {
            value = document.querySelector(".input").value;
            string = value.substring(0, value.length - 1);
               document.querySelector('input').value = string;
            // display.innerText = display.innerText.slice(0, -1);
        }
        else {
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }
    });
});