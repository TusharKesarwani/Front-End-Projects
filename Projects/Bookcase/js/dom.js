const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId"; 

//menginisialisasi buku
function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID );

    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookYear = document.getElementById("year").value;
    const bookCheck = document.getElementById("finishedBook").checked;

    const book = storeBook(bookTitle,bookAuthor,bookYear,bookCheck);
    //menyimpan objek
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookCheck);
  
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    

    if(bookCheck) {
        completedBOOKList.append(book);
        updateDataToStorage();
    } else {
        uncompletedBOOKList.append(book);
        updateDataToStorage();
    }
}

//menambahkan buku
function storeBook(bookTitle, bookAuthor, bookYear, bookCheck) {
    
    const textTitle = document.createElement("h1");
    textTitle.innerText = bookTitle;
 
    const textAuthor = document.createElement("h4");
    textAuthor.innerText = bookAuthor;

    const textYear = document.createElement("p");
    textYear.innerText = bookYear;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear);
 
    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
 
    if(bookCheck){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }
    return container;
}

//membuat tombol
function createButton(buttonTypeClass, eventListener) {
    const bookObject = composeBookObject();
    const button = document.createElement("button");
    //menambahkan ide ke dalam button
    button.setAttribute("id", bookObject.id);
    //menambahkan class
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

//menaruh buku di finished list
function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const textJudul = taskElement.querySelector(".inner > h1").innerText;
    const textPenulis = taskElement.querySelector(".inner > h4").innerText;
    const textTahun = taskElement.querySelector(".inner > p").innerText;
 
    const newBook = storeBook(textJudul, textPenulis, textTahun, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.bookCheck = true;
    newBook[BOOK_ITEMID] = book.id;
    
    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

//mengembalikan buku ke unfinished list
function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const textJudul = taskElement.querySelector(".inner > h1").innerText;
    const textPenulis = taskElement.querySelector(".inner > h4").innerText;
    const textTahun = taskElement.querySelector(".inner > p").innerText;
 
    const newBook = storeBook(textJudul, textPenulis, textTahun, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.bookCheck = false;
    newBook[BOOK_ITEMID] = book.id;
 
    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addBookToCompleted(event.target.parentElement);
    });
}

function removeBookFromCompleted(taskElement) {
    //menghapus data dari array
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        let result = confirm("Want to delete?");
        if (result) {
            removeBookFromCompleted(event.target.parentElement);
        }
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

//konfirmasi menghapus
function confirmation() {
    confirm("Press a button!");
}

//mencari buku
function mySearch() {
    const searching = document.getElementById("cari").value.toLowerCase();
    const listTitle = document.querySelectorAll(".inner");
    let i = 0;
    for(title of listTitle) {
            if(searching != "") {
                if(listTitle[i].childNodes[0].innerText.toLowerCase().includes(searching)) {
                    listTitle[i].parentElement.style.display = "";
                } else {
                    listTitle[i].parentElement.style.display = "none";
                } 
            } else {
                listTitle[i].parentElement.style.display = "";
            }
            i++;
    }
}