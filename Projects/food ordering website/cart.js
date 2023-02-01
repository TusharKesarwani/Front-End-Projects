const items=[
    {
        "id":1,
        "name":"Funfetti Cake",
        "cost":699,
    },
    {
        "id":2,
        "name":"Vanilla Cake",
        "cost":599,
    },
    {
        "id":3,
        "name":"Chocolate Pecan Krantz Cake",
        "cost":599,
    },
    {
        "id":4,
        "name":"Colourcombo Cake",
        "cost":149,
    },
    {
        "id":5,
        "name":"Vanilla Pan Cake",
        "cost":199,
    },
    {
        "id":6,
        "name":"Chocolate Bark Cake",
        "cost":199,
    },
    {
        "id":7,
        "name":"Choco Love Pinata Cake",
        "cost":899,
    },
    {
        "id":8,
        "name":"Wedding Floral Cake",
        "cost":1490,
    },
    {
        "id":9,
        "name":"Red Velvet Cake",
        "cost":499,
    },
    {
        "id":10,
        "name":"Fondant Cake",
        "cost":499,
    }, 
    {
        "id":11,
        "name":"Pull Me Up",
        "cost":599,
    }, 
    {
        "id":12,
        "name":"Pineapple Cake",
        "cost":599,
    }, 
    {
        "id":13,
        "name":"Panda Cake",
        "cost":799,
    },  
    {
        "id":14,
        "name":"Minnions Cake",
        "cost":899,
    },  
    {
        "id":15,
        "name":"Special Pooh Cake",
        "cost":1999,
    },   
];

var TotalAmount=0;
var ItemCount=0;
var cartTable=document.getElementById("carttable");
var cart=document.getElementsByClassName("cart")[0];
cart.style.display="none";
function AddToCart(id)
{
    cart.style.display="block";
    var itemid=id,
    item=items.find(item=> item.id===itemid),
    itemcost =item.cost,
    itemname=item.name,
    quantity=1;
    ItemCount+=1;
    TotalAmount += quantity*itemcost;
    
    
    cartTable.innerHTML+=
    `<tr>
        <th>${ItemCount}</th>
        <th>${itemname}</th>
        <th>${quantity}</th>
        <th>${itemcost}</th>
        <th>${quantity*itemcost}</th>
    </tr>`
    
    var cartTotal=document.getElementById("cartTotal");
    cartTotal.innerHTML=
    `<tr>
        <th></th>
        <th></th>
        <th></th>
        <th><b>TOTAL</b></th>
        <th><b>${TotalAmount}</b></th>
    </tr>`
    
}