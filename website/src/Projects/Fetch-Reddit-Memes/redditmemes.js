var after=''
function fetchMemes(){
  
    if(document.getElementById('memes')){
        document.getElementById('memes').remove()
    }
    let parentdiv = document.createElement('div');
parentdiv.id='memes';
fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
.then((apidata)=>{

    return apidata.json();
})
.then(body=>{
    after=body.data.after;
    console.log(after);
    for(let i=0; i<body.data.children.length; i++){
        if(body.data.children[i].data.post_hint==='image'){
            let div=document.createElement('div')
            div.id="mmholder"
            let h3=document.createElement('h3');
            let image=document.createElement('img');
            image.id="imageholder"
            image.src=body.data.children[i].data.url_overridden_by_dest
            h3.textContent=body.data.children[i].title
            div.appendChild(h3);
            div.appendChild(image);
            parentdiv.appendChild(div);
        }
    }
    document.body.appendChild(parentdiv);
})
.catch((error)=>{
    console.log(`Error occured ${error}`);
})
}