var message = document.querySelector('textarea');
var key = document.querySelector('input');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

var para = document.getElementById('para');

//Encryption function

function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}

btn1.addEventListener('mouseover',()=>{

    let msgVal = message.value;
    let keyVal = key.value;

    //console.log(msgVal);
    //console.log(keyVal); 

    keyVal = keyVal % 26; 
    /*this is required bcz if number is >26 or < 0 .to handle this case we need to divide the 
                     num by 26 and remainder need to be considered always*/
    var lowerCase = msgVal.toLowerCase();
    

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    var newStr = '';

    for (i=0;i<lowerCase.length;i++){

        var currentLetter = lowerCase[i];
        var k = isCharacterALetter(currentLetter);
        //console.log(!k);
        
        if(currentLetter === ' ' || !k){

            newStr += currentLetter;
            continue;
        }
        

        var currentIndex = alphabet.indexOf(currentLetter);
        var newIndex = currentIndex + keyVal;

        //handling edge cases

        if(newIndex > 25){
            newIndex = newIndex-26;
        }

        if(newIndex<0){
            newIndex=newIndex+26;
        }

        //if the letter is upperCase convert to uppercase while displaying

        if(msgVal[i] ===(lowerCase[i].toUpperCase())){

            newStr = newStr + alphabet[newIndex].toUpperCase();
        }
        else{

            newStr = newStr + alphabet[newIndex];
        }
    }

   // console.log(newStr);

     document.getElementById('para').innerHTML = newStr;

});

//Decryption function

btn2.addEventListener('mouseover',()=>{
   
   // console.log(para.value);
   //if user want to decrypt 
    if(para.value == ''){

        let msgVal = message.value;
        let keyVal = key.value;

    //console.log(msgVal);
    //console.log(keyVal); 

    keyVal = keyVal % 26; 
    /*this is required bcz if number is >26 or < 0 .to handle this case we need to divide the 
                     num by 26 and remainder need to be considered always*/
    var lowerCase = msgVal.toLowerCase();
    

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    var newStr = '';

    for (i=0;i<lowerCase.length;i++){

        var currentLetter = lowerCase[i];
        var k = isCharacterALetter(currentLetter);
        console.log(!k);
        
        if(currentLetter === ' ' || !k){

            newStr += currentLetter;
            continue;
        }
        

        var currentIndex = alphabet.indexOf(currentLetter);
        var newIndex = currentIndex + keyVal;

        //handling edge cases

        if(newIndex > 25){
            newIndex = newIndex-26;
        }

        if(newIndex<0){
            newIndex=newIndex+26;
        }

        //if the letter is upperCase convert to uppercase while displaying

        if(msgVal[i] ===(lowerCase[i].toUpperCase())){

            newStr = newStr + alphabet[newIndex].toUpperCase();
        }
        else{

            newStr = newStr + alphabet[newIndex];
        }
    }

   // console.log(newStr);

     document.getElementById('para').innerHTML = newStr;

    }
    else{

        para.value = message.value;
    }
    
    
});

