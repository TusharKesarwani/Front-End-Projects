// 
const forward=()=>{
    counter++;
    sliderImage();
}
const backward=()=>{
    counter--;
    sliderImage();
}


// navbar toggler
const toggleNav=()=>{
    const navbar=document.querySelector('.navbar')
     const navLinks=document.querySelector('.navLinks')
    navbar.classList.toggle('navActive')
    navLinks.classList.toggle('navLinksActive')


}
//Toggler

const events=document.querySelectorAll('.eventBox');
const news =document.querySelectorAll('.newsBox');

const btn1 = document.querySelector('.news')
const eventToggle=()=>{
        news.forEach((event)=>{
            event.style.display='block';
        })
        events.forEach((event)=>{
            event.style.display='none';
        })
      
    }
    const newsToggle=()=>{
            events.forEach((event)=>{
                event.style.display='block';
            })
            news.forEach((event)=>{
                event.style.display='none';
            })
        }


        const stdInfo=document.querySelectorAll('.info');
const admInfo =document.querySelectorAll('.AdmInfo');
const facInfo =document.querySelectorAll('.facultyInfo');

const stdToggle=()=>{
        stdInfo.forEach((event)=>{
            event.style.display='block';
        })
        admInfo.forEach((event)=>{
            event.style.display='none';
        })
        facInfo.forEach((event)=>{
            event.style.display='none';
        })
    }
    const admToggle=()=>{
             stdInfo.forEach((event)=>{
            event.style.display='none';
        })
        admInfo.forEach((event)=>{
            event.style.display='block';
        })
        facInfo.forEach((event)=>{
            event.style.display='none';
        })
        }
        const facToggle=()=>{
             stdInfo.forEach((event)=>{
            event.style.display='none';
        })
        admInfo.forEach((event)=>{
            event.style.display='none';
        })
        facInfo.forEach((event)=>{
            event.style.display='block';
        })
        }
    
        //color change
      
