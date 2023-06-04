import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const appSettings = {
    databaseURL: "https://playground-c5731-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "playground-c5731"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const CartDb = ref(database, "Items")
console.log(app);

var input = document.getElementById("input-field");
var btn = document.getElementById("btn");
var List = document.querySelector('.List')

function AppendLi(item) {
    let itemId = item[0]
    let itemVal = item[1]
    let Item_list = document.createElement("li");
    Item_list.innerHTML = itemVal;
    List.appendChild(Item_list)
   const RemoveItem = Item_list.addEventListener("click", () => {
       
       let RemoveItemPath = ref(database,`Items/${itemId}`);
   
       deleteItem(RemoveItemPath)
    })
   
    
    return console.log(`${itemVal} added to database.`);
}
function deleteItem (item){
  return  remove(item)
}
function ClrVal(item) {
    return item.value = ''
}
async function DisplayItems(snapshot) {
  

       await onValue(CartDb, (snapshot) => {

        if(snapshot.exists()){

            let CartArr = Object.entries(snapshot.val())
            ClrList()
    
            CartArr.map((elem) => {
    
                let currItem = elem
                let currId = currItem[0]
                let currItemVal = currItem[1]
    
                // console.log(elem);
                AppendLi(currItem)
    
            })
        }else{
            List.innerHTML = "Nothing is Here!!!"
        }
           
       
      
       })
   

}

function ClrList() {
    return List.innerHTML = ""
}


btn.addEventListener("click", () => {

    let Item = input.value;
    push(CartDb, Item)
    // AppendLi(Item)
    ClrVal(input)

})

DisplayItems()