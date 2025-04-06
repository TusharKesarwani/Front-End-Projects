const wrapper=document.querySelector(".sliderwrapper");
const menuitem=document.querySelectorAll(".menuitems");


const products = [
    {
      id: 1,
      title: "Air Force",
      price: 119,
      colors: [
        {
          code: "black",
          img: "./img/air.png",
        },
        {
          code: "darkblue",
          img: "./img/air2.png",
        },
      ],
    },
    {
      id: 2,
      title: "Air Jordan",
      price: 149,
      colors: [
        {
          code: "lightgray",
          img: "./img/jordan.png",
        },
        {
          code: "green",
          img: "./img/jordan2.png",
        },
      ],
    },
    {
      id: 3,
      title: "Blazer",
      price: 109,
      colors: [
        {
          code: "lightgray",
          img: "./img/blazer.png",
        },
        {
          code: "green",
          img: "./img/blazer2.png",
        },
      ],
    },
    {
      id: 4,
      title: "Crater",
      price: 129,
      colors: [
        {
          code: "black",
          img: "./img/crater.png",
        },
        {
          code: "lightgray",
          img: "./img/crater2.png",
        },
      ],
    },
    {
      id: 5,
      title: "Hippie",
      price: 99,
      colors: [
        {
          code: "gray",
          img: "./img/hippie.png",
        },
        {
          code: "black",
          img: "./img/hippie2.png",
        },
      ],
    },
  ];

 //if user selects new product  from 5 categories
  let choosenProduct=products[0]

  //to change the product which is selected
  const currentproductimg=document.querySelector(".productimg");
  const currentproducttitle=document.querySelector(".producttitle");
  const currentproductprice=document.querySelector(".productprice");
  const currentproductcolor=document.querySelectorAll(".color");
  const currentproductsizes=document.querySelectorAll(".size");

//to add functionality of clicking the items and moving slider
menuitem.forEach((item,index)=>{
    item.addEventListener("click", ()=>{
        //change the current slide 
        wrapper.style.transform=`translateX(${-100 * index}vw)`;

        //change the choosen product at downside 
        choosenProduct=products[index];

        //change text, price of currentproduct 
        currentproducttitle.textContent = choosenProduct.title;
        currentproductprice.textContent = "$" + choosenProduct.price;
        //to change the img of new choosen img
        currentproductimg.src = choosenProduct.colors[0].img;


        //assigning new colors of choosen product
        currentproductcolor.forEach((color,index) => {
            color.style.backgroundColor = choosenProduct.colors[index].code;
        });

    });
});

//when user selects color of choosen product it should change
currentproductcolor.forEach((color,index) =>{
    color.addEventListener("click" , ()=>{
        currentproductimg.src = choosenProduct.colors[index].img;
    });
});


//to change sizes of choosen product
currentproductsizes.forEach((size,index)=>{
    size.addEventListener("click" ,()=>{
        //this will change previous choosen box color
        currentproductsizes.forEach((size)=>{
            size.style.backgroundColor="white";
            size.style.color="black";
        })
        //by doing this it only clicks th size btn but does not undo it 
        //meaning if we choose 42 then choose 44 th black color  on 42 will remain as it is 
        size.style.backgroundColor="black"
        size.style.color="white"
    });
});

const productbutton = document.querySelector(".productbtn");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productbutton.addEventListener("click" ,()=>{
    payment.style.display="flex"
});

close.addEventListener("click" ,()=>{
    payment.style.display="none"
})
