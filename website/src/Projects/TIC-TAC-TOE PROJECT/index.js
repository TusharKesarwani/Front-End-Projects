let turn="X";
let boxes=document.getElementsByClassName("box");
let k=0;
let fill=0;
document.getElementById("player-turn").innerText=`Player X turn`
function changeturn(){
    if(turn==="X")
    return "0"
    else
    return "X"
}

// Function to check whether text filled is X,0 or something else
function checkText(e)
{
 if(e.innerText==="0"||e.innerText==="X")
 return true;
 else
 return false;
}
//Check wthether someone is winner or not
 function check_for_win()
 {
     let wins=[
         [boxes[0],boxes[1],boxes[2]],
         [boxes[3],boxes[4],boxes[5]],
         [boxes[6],boxes[7],boxes[8]],
         [boxes[0],boxes[3],boxes[6]],
         [boxes[1],boxes[4],boxes[7]],
         [boxes[2],boxes[5],boxes[8]],
         [boxes[0],boxes[4],boxes[8]],
         [boxes[2],boxes[4],boxes[6]],
     ]
     for(let i=0;i<8;i++)
     {
     if(wins[i][0].innerText===wins[i][1].innerText&&wins[i][2].innerText===wins[i][1].innerText&&checkText(wins[i][0])&&checkText(wins[i][1])&&checkText(wins[i][2]))
     {
     let information=document.getElementById("information");
     let e=document.createElement("img");
     e.src=`./${turn}.gif`;
     e.id="won"
     e.style.height="25rem"
     e.style.width="25rem"
     information.appendChild(e);
     k=1;
     break;
     }
     }
 }

//Adding event listener on every cell
     Array.from(boxes).forEach(element=>{
     element.addEventListener('click',()=>{
        if (element.innerText !== "") 
        {
            return;
        }
        
       else if(element.innerText==="")
       element.innerText=turn
       fill++;
       check_for_win()
       if(k==1)
       {
            Array.from(boxes).forEach(e=>{
            e.disabled=true
            })
          document.getElementById("player-turn").innerText=`Player ${turn} won`
       }
       else if(fill===9)
       {
        document.getElementById("player-turn").innerText=`Game Over`
        Array.from(boxes).forEach(e=>{
        e.disabled=true
       });
       }
       else 
       {
           turn=changeturn()
           document.getElementById("player-turn").innerText=`Player ${turn} turn`
       }
    })
 })

 // adding event listener on reset button
 let reset=document.getElementById("reset")
 reset.addEventListener('click',()=>{
    Array.from(boxes).forEach(e=>{
        e.disabled=false
        e.innerText=""
        e.backgroundcolor="white"
 })
 turn="X" 
 k=0;
 fill=0;
 document.getElementById("player-turn").innerText=`Player ${turn} turn`
 let e=document.getElementById("won");
 document.getElementById("information").removeChild(e);
})
