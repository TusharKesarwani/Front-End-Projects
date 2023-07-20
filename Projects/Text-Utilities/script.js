const upper=document.querySelector('#uppercase');
const lower=document.querySelector('#lowercase');
const clr=document.querySelector('#clear');
const copy=document.querySelector('#copy');
const trim=document.querySelector('#trim');
const textArea=document.querySelector('textarea');
const first=document.querySelector('#first');
// const second=document.querySelector('#second');
const third=document.querySelector('#third');
upper.addEventListener('click',()=>{
    let text=textArea.value;
    const newText=text.toUpperCase();
    textArea.value=newText;
})
lower.addEventListener('click',()=>{
    let text=textArea.value;
    const newText=text.toLowerCase();
    textArea.value=newText;
})
clr.addEventListener('click',()=>{
    textArea.value='';
})
copy.addEventListener('click',()=>{
    navigator.clipboard.writeText(textArea.value);
    alert("Copied to clipboard"); 
})
trim.addEventListener('click',()=>{
    let newText = (textArea.value).split(/[ ]+/);   
    textArea.value=(newText.join(" "));
})
textArea.addEventListener('keyup',()=>{
    let text=textArea.value;
    let words=text.split(/\s+/).filter((element)=>{return element.length!==0}).length;
    let chars=text.length;
    first.innerText=`${words} Words and ${chars} Characters`;
    third.innerText=(text.length?text:"Nothing to preview");
})



