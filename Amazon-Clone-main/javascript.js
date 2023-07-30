import { todayDeal } from "./todayDeal.js"

let slideBtnLeft = document.getElementById("slide-btn-left")
let slideBtnRight = document.getElementById("slide-btn-right")
let imgItem = document.querySelectorAll(".image-item")


console.log(imgItem.length - 1)

let startSlider = 0
let endSlider = (imgItem.length - 1) * 100  // 700

slideBtnLeft.addEventListener("click", handleLeftBtn)

function handleLeftBtn() {
    if (startSlider < 0) {
        startSlider = startSlider + 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(${startSlider}%)`;
    })
}

slideBtnRight.addEventListener("click", handleRightBtn)

function handleRightBtn() {
    if (startSlider >= -endSlider + 100) {
        startSlider = startSlider - 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(${startSlider}%)`;
    })

}
//render automatic
function renderSlideAuto() {

    if (startSlider >= -endSlider + 100) {
        handleRightBtn()
    }
    else {
        startSlider = 0;
    }
}
setInterval(renderSlideAuto, 2000);




/***** sidebar navigation  */
const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id")
const sidebarOpenNavigationEl = document.getElementById("open-nav-sidebar")
const sidebarCloseNavigationEl = document.getElementById("sidebar-navigation-close")


//  console.log(sidebarNavigationEl)

sidebarOpenNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.toggle("slidebar-show")
})
sidebarCloseNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.toggle("slidebar-show")
})




//today deals 
console.log(todayDeal)
let todayDealProductListEl = document.querySelector(".today_deals_product_list")
console.log(todayDealProductListEl)

let todayDealProductHTML = ""

let todayDeallength = todayDeal.length

for (let i = 0; i < todayDeallength; i++) {
    // console.log(todayDeal[i])

    todayDealProductHTML += `
        <div class="today_deals_product_item">
                <div class="todayDeals_product_image">
                    <img src=${todayDeal[i].img} />
                </div>
            


            <div class="discount_Contaienr">
                <a href="#">Up to ${todayDeal[i].discount}% off</a>
                <a href="#">${todayDeal[i].DealOfDay}</a>
            </div>
            <p>${todayDeal[i].desc}</p>
        </div>
    `
}

todayDealProductListEl.innerHTML = todayDealProductHTML
//  console.log(todayDealProductHTML)

let today_deal_btn_prevEl = document.getElementById("today_deal_btn_prev")
let today_deal_btn_nextEl = document.getElementById("today_deal_btn_next")
let today_deals_product_itemEl = document.querySelectorAll(".today_deals_product_item")

let startProduct = 0;


today_deal_btn_prevEl.addEventListener("click", () => {

   
    if(startProduct < 0){
        startProduct += 500
    }
    if(startProduct > -2000){
        today_deals_product_itemEl.forEach(el =>{
            el.style.transform = `translateX(${startProduct}%)`
        })
    }

})

today_deal_btn_nextEl.addEventListener("click", () => {
    // alert("next")
    
    if(startProduct > -1500){
        startProduct -= 500
    }

    today_deals_product_itemEl.forEach(el =>{
        el.style.transform = `translateX(${startProduct}%)`
    })
    
    
})

const backtop = document.querySelector(".backtop");

backtop.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})

const sidebar=document.querySelector(".sidebar");
const cross=document.querySelector(".fa-xmark");
const black=document.querySelector(".black");
const sidebtn=document.querySelector(".second-1");

sidebtn.addEventListener("click",()=>{
    sidebar.classList.add("active");
    cross.classList.add("active");
    black.classList.add("active");
    document.body.classList.add("stop-scroll");
})
cross.addEventListener("click",()=>{
    sidebar.classList.remove("active");
    cross.classList.remove("active");
    black.classList.remove("active");
    document.body.classList.remove("stop-scroll");
})

const sign=document.querySelector(".ac");
const tri=document.querySelector(".triangle");
const signin=document.querySelector(".hdn-sign");

sign.addEventListener("click",()=>{
    black.classList.toggle("active-1");
    signin.classList.toggle("active");
    tri.classList.toggle("active");
    document.body.classList.toggle("stop-scroll");
})