const quote  = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");

quote.innerText = localQuotes[0].text;
author.innerText = "-" + localQuotes[0].author;

btn.addEventListener("click", () => {

     const l = localQuotes.length;
     const random = Math.floor(Math.random()*l);

     quote.innerText = localQuotes[random].text;
     author.innerText = "-" + localQuotes[random].author;
})


