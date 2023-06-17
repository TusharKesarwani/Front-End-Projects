const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";
const STORAGE_KEY = "BOOKCASE_APPS";

let books = [];

// Check if local storage is supported
function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// Save data to local storage
function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

// Load data from local storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    books = data;
  }
  document.dispatchEvent(new Event("ondataloaded"));
}

// Update data in local storage
function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

// Create book object
function composeBookObject(title, author, year, bookCheck) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    bookCheck,
  };
}

// Add book to the list
function addBook() {
  const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookYear = document.getElementById("year").value;
  const bookCheck = document.getElementById("finishedBook").checked;

  const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookCheck);

  books.push(bookObject);

  const book = storeBook(bookTitle, bookAuthor, bookYear, bookCheck);
  book[BOOK_ITEMID] = bookObject.id;

  if (bookCheck) {
    completedBOOKList.append(book);
  } else {
    uncompletedBOOKList.append(book);
  }

  updateDataToStorage();

  // Reset input values
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
  document.getElementById("finishedBook").checked = false;

  
}

// Store book data in HTML
function storeBook(title, author, year, bookCheck) {

  const textTitle = document.createElement("h1");
  textTitle.innerText = title;

  const textAuthor = document.createElement("h4");
  textAuthor.innerText = author.charAt(0) == '~'?author:`~${author}`;
 
  const textYear = document.createElement("p");
  textYear.innerText = year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (bookCheck) {
    container.append(createUndoButton(), createTrashButton());

  } else {
    container.append(createCheckButton(), createTrashButton());
  
  }

  return container;
}

// Create check button
function createCheckButton() {
  return createButton("check-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

// Create trash button
function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeBookFromCompleted(event.target.parentElement);
  });
}

// Create undo button
function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}

// Create generic button
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

// Move book to completed list
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

// Move book to unfinished list
function undoBookFromCompleted(taskElement) {
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

// Remove book from completed list
function removeBookFromCompleted(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();

  updateDataToStorage();

  
}

// Find book by ID
function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

// Find book index by ID
function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
}


// Render book data from array
function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  // Clear existing content
  listUncompleted.innerHTML = "";
  listCompleted.innerHTML = "";


  for (book of books) {
    const newBook = storeBook(book.title, book.author, book.year, book.bookCheck);
    newBook[BOOK_ITEMID] = book.id;

    if (book.bookCheck) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}

// Search book
document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = document.getElementById("cari").value.toLowerCase();
  const searchResults = books.filter(function (book) {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    return title.includes(searchInput) || author.includes(searchInput);
  });
  showSearchResults(searchResults);
});

// Show search results
function showSearchResults(results) {
  const modal = document.querySelector(".modal");
  const bookDetails = document.querySelector(".book-details");
  bookDetails.innerHTML = "";

  if (results.length === 0) {
    bookDetails.innerHTML = "<p>No matching books found.</p>";
  } else {
    results.forEach(function (book) {
      const title = book.title;
      const author = book.author;
      const year = book.year;
      const status = book.bookCheck ? "Finished" : "Unfinished";

      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      const titleElement = document.createElement("h3");
      titleElement.textContent = `Book Title: ${title}`;

      const authorElement = document.createElement("p");
      authorElement.textContent = `Author: ${author}`;

      const yearElement = document.createElement("p");
      yearElement.textContent = `Year: ${year}`;

      const statusElement = document.createElement("p");
      statusElement.textContent = `Status: ${status}`;

      if (status === 'Unfinished') {
        statusElement.style.color = "red";
      } else {
        statusElement.style.color = "green";
      }

      bookElement.append(titleElement, authorElement, yearElement, statusElement);
      bookDetails.appendChild(bookElement);
    });
  }

  modal.style.display = "block";
}

// Close modal
document.querySelector(".close").addEventListener("click", function () {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
});

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
// Toggle navigation menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
  // Load data from storage
  if (isStorageExist()) {
    loadDataFromStorage();
  }

  // Save data to storage when changes occur
  document.addEventListener("ondatasaved", function () {
    console.log("Data berhasil disimpan.");
  });

  // Update data when loaded
  document.addEventListener("ondataloaded", function () {
    refreshDataFromBooks();
  });

  // Initial data load
  refreshDataFromBooks();
});