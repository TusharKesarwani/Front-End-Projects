var message = document.querySelector('textarea');
var key = document.querySelector('input');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
var para = document.getElementById('para');

//Encryption function

function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}
let count=0;
btn1.addEventListener('click',(event)=>{

    console.log("e");
    event.preventDefault();
    let msgVal = message.value;
    console.log(msgVal);
    let keyVal = key.value;

    //console.log(msgVal);
    //console.log(keyVal); 

    keyVal = keyVal % 26; 
    /*this is required bcz if number is >26 or < 0 .to handle this case we need to divide the 
                     num by 26 and remainder need to be considered always*/
    var lowerCase = msgVal.toLowerCase();
    
   console.log("lmsg is: ",lowerCase);
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let newStr = ''; 

    for (i=0;i<lowerCase.length;i++){
        //console.log(lowerCase[i]);

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
            console.log(newStr);
        }
        else{

            newStr = newStr + alphabet[newIndex];
            console.log(newStr);
        }
    }

     //console.log("newStr is: ",newStr);
    
     document.getElementById('para').innerHTML='';
     //console.log("before: ",document.getElementById('para').innerHTML);
     para.innerHTML = newStr;
     //console.log("after: ",document.getElementById('para').innerHTML);

});

