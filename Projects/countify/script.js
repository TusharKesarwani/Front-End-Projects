const textArea=document.getElementById('content')
const characterCount=document.getElementById('cCount')
const wordsCount=document.getElementById('wCount')

textArea.oninput=()=>{
    let characters=textArea.value ;
    characterCount.textContent=characters.replace(/\s/g, '').length;
    let word=textArea.value.split(' ').filter((item)=>{
        return item!='';
    })
    wordsCount.textContent=word.length; 
} 