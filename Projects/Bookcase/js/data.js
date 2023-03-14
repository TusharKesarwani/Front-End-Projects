const STORAGE_KEY = "BOOKCASE_APPS";
 
let books = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}

//menyimpan data ke local
function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}

//memanggil saveData()
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}

//create object
function composeBookObject(title, author, year, bookCheck) {
   return {
       id: +new Date(),
       title,
       author,
       year,
       bookCheck
   };
}


function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
function findBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

//me-render data BOOK yang ada pada object array bookss
function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  
    for(book of books){
        const newBook = storeBook(book.title, book.author, book.year, book.bookCheck);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.bookCheck){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }