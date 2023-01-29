let books;

async function renderBooks(filter){
  const bookWrapper = document.querySelector('.books');

  bookWrapper.classList += ' books__loading'

  if(!books){
    books = await getBooks();
  }
  
  bookWrapper.classList.remove('books__loading')

  if(filter === 'LOW_TO_HIGH'){
    // console.log(filter);
    books.sort((a,b) => (a.salePrice || a.originalPrice)-(b.salePrice || b.originalPrice));
    // console.log(filterBooks);
  }
  else if(filter === 'HIGH_TO_LOW'){
    books.sort((a,b) => (b.salePrice || b.originalPrice)-(a.salePrice || a.originalPrice));
  }
  else if(filter === 'RATING'){
    books.sort((a,b) => b.rating-a.rating);
  }


  const booksHtml = books.map((book) => {
    return `<div class="book">
      <figure class="book-img-wrapper">
          <img class="book-image" src="${book.url}" alt="">
      </figure>
      <div class="book-title">
          ${book.title}
      </div>
      <div class="book-rating">
        ${ratingsHTML(book.rating)}
      </div>
      <div class="book-price">
      ${priceHTML(book.originalPrice,book.salePrice)}
      </div>
      </div>`;
    })
    .join("");
    
    bookWrapper.innerHTML = booksHtml;
  }
  
  function priceHTML(originalPrice,salePrice){
    if(!salePrice){
      return `$${originalPrice.toFixed(2)}`
    }else{
      return `<span class="book-price-normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
    }
    
}
function ratingsHTML(rating){
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); i++) {
   ratingHTML += `<i class="fas fa-star"></i>\n`;
  }
 if(!Number.isInteger(rating)){
   ratingHTML += `<i class="fas fa-star-half"></i>\n`
 }
 return ratingHTML;
}



function filterBooks(event){
 renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
});



// FAKE DATA
function getBooks(){

 return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "https://covers.openlibrary.org/b/id/10958382-L.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Can't Hurt Me",
          url: "https://covers.openlibrary.org/b/id/10425061-L.jpg",
          originalPrice: 29,
          salePrice: null,
          rating: 5,
        },
        {
          id: 4,
          title: "Deep Work",
          url: "https://covers.openlibrary.org/b/id/10088428-L.jpg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "The 10X Rule",
          url: "https://covers.openlibrary.org/b/id/9978588-L.jpg",
          originalPrice: 32,
          salePrice: null,
          rating: 5,
        },
        {
          id: 6,
          title: "Sell Or Be Sold",
          url: "https://covers.openlibrary.org/b/id/7737110-L.jpg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Rich Dad Poor Dad",
          url: "https://covers.openlibrary.org/b/id/2380224-L.jpg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "Cashflow Quadrant",
          url: "https://covers.openlibrary.org/b/id/1954899-L.jpg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "48 Laws of Power Summary",
          url: "https://covers.openlibrary.org/b/id/8906626-L.jpg",
          originalPrice: 35,
          salePrice: 19.95,
          rating: 4.5,
        },
        {
          id: 10,
          title: "The 5 Second Rule",
          url: "https://covers.openlibrary.org/b/id/8114155-L.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 2.5,
        },
        {
          id: 11,
          title: "How to Win Friends & Influence People",
          url: "https://covers.openlibrary.org/b/id/7895280-L.jpg",
          originalPrice: 30,
          salePrice: 20,
          rating: 5,
        },
        {
          id: 12,
          title: "Mastery",
          url: "https://covers.openlibrary.org/b/id/8479576-L.jpg",
          originalPrice: 30,
          salePrice: 12.95,
          rating: 4.5,
        },
      ])
    }, 1000);
  })
 };