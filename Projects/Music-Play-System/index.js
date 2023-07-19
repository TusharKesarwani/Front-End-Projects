var len=document.querySelectorAll(".play").length;
for(var i=0;i<len;i++)
{
   document.querySelector(".playShubh").addEventListener("click",function()
   {
         
    var audio=new Audio("music/Cheques.mp3");
    audio.play();
   })
   document.querySelector(".playMary").addEventListener("click",function()
   {
    var audio=new Audio("music/MaryOnACross.mp3");
    audio.play();
   
   })
   document.querySelector(".playFully").addEventListener("click",function()
   {
    var audio=new Audio("music/FullyLoaded.mp3");
    audio.play();
  
   })
}

