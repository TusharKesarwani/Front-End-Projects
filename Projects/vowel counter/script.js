const textBox=document.querySelector('.wrapper textarea');
const checkbtn = document.querySelector('#check-btn');
const vowelCountShow = document.querySelector('#vowel-count');
vowelCountShow.innerHTML=0;

checkbtn.addEventListener('click',()=>{
    let count=0;
    const vowel=['a','e','i','o','u'];
    for(let letter of textBox.value.toLowerCase()){
        if(vowel.includes(letter)){
            count++;
        }
    }
    vowelCountShow.innerHTML=count;
});
