function computeLoan(){
    const amount = document.querySelector('#amount').value;
    const interest_rate = document.querySelector('#interest_rate').value;
    const months = document.querySelector('#months').value;
    if(amount<0&&interest_rate<0&&months<0)
    {
        alert("Please enter positive Loan amount , positive Interest Rate and positive number of months!");
        return;  
    }
    if(amount<0 && interest_rate<0)
    {
        alert("Please enter positive Loan amount and positive Interest rate!");
        return;
    }
    if(amount<0 && months<0)
    {
        alert("Please enter positive Loan amount and positive number of months!");
        return;
    }
    if(interest_rate<0&&months<0)
    {
        alert("Please enter positive Interest Rate and positive number of months!");
        return;
    }
    if(amount<0)
    {
        alert("Please enter positive Loan amount!");
        return;
    }
    if(interest_rate<0)
    {
        alert("Please enter positive Interest Rate!");
        return;
    }
    if(months<0)
    {
        alert("Please enter positive number of months!");
        return;
    }
    const interest = (amount * (interest_rate * 0.01)) / months;
    let payment = ((amount / months) + interest).toFixed(2); //calculate monthly payment

    //regedit to add a comma after every three digits
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //\B looks for a word boundary, ? says what to look for, \d looks for 3 digits in a row
    document.querySelector('#payment').innerHTML = `Monthly Payment = ${payment}` 
    document.getElementById("payment").style.color = "black";
}