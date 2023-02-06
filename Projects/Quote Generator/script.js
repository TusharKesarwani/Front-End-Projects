const quote  = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
const tweetMe = document.getElementById("tweetme");
let tweetmsg = "";
let tweetauthor="";
quote.innerText = localQuotes[0].text;
author.innerText = "-" + localQuotes[0].author;




btn.addEventListener("click", () => {

     const l = localQuotes.length;
     const random = Math.floor(Math.random()*l);
     
     quote.innerText = localQuotes[random].text;
     author.innerText = "-" + localQuotes[random].author;
     tweetmsg = quote.innerText;
     tweetauthor=author.innerText;
});

// tweet the quote.....

tweetMe.addEventListener('click',()=>{

     //console.log(tweetmsg);
     const msg = `https://twitter.com/intent/tweet?text=${tweetmsg}+${tweetauthor}`;
     window.open(msg);
});

