const items=[
    {
        "id":1,
        "name":"Masala Dosa",
        "cost":100,
    },
    {
        "id":2,
        "name":"Idli",
        "cost":120,
    },
    {
        "id":3,
        "name":"Medu Vada",
        "cost":90,
    },
    {
        "id":4,
        "name":"Vada Pav",
        "cost":30,
    },
    {
        "id":5,
        "name":"Puran Poli",
        "cost":150 ,
    },
    {
        "id":6,
        "name":"Khaman - The Sponge Snack",
        "cost":300,
    },
    {
        "id":7,
        "name":"Khandvi",
        "cost":100,
    },
    {
        "id":8,
        "name":"Muthiya",
        "cost":120,
    },
    {
        "id":9,
        "name":"Dal Bati Churma",
        "cost":250,
    },
    {
        "id":10,
        "name":"Mohan Thaal",
        "cost":200,
    }, 
    {
        "id":11,
        "name":"Mirchi Bada",
        "cost":180,
    }, 
    {
        "id":12,
        "name":"Pineapple Cake",
        "cost":599,
    }, 
    {
        "id":13,
        "name":"Paapri Chaat",
        "cost":100,
    },  
    {
        "id":14,
        "name":"Shahi Aloo Tokri Chaat",
        "cost":150,
    },  
    {
        "id":15,
        "name":"Bhel",
        "cost":120,
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