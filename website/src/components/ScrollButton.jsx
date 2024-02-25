import React, { useState, useEffect } from "react";

const ScrollButton = () => {
  return (
    <div id="progress">
      <i id="progress-value" className="fas fa-arrow-up"></i>
    </div>
  );
};

function calculateScrollValue(){

  let scrollProgress=document.getElementById('progress');
  let progressValue=document.getElementById('progress-value');

  let pos=document.documentElement.scrollTop;
  let calcHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

  let scrollValue=Math.round((pos*100)/calcHeight);

  // for hiding scrollbar button
  if(pos>100){
      scrollProgress.style.display='grid';
  }
  else{
      scrollProgress.style.display='none';
  }


  scrollProgress.addEventListener('click',()=>{
      document.documentElement.scrollTop=0;
  })
 scrollProgress.style.background=`conic-gradient(#0D4360 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;

}
window.onscroll=calculateScrollValue;
window.onload=calculateScrollValue;
export default ScrollButton;
