//This is the main function which will create a div for each book and display all the details in the proper format

const addLoadingSpinner = () => {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add("loader");
  const container = document.getElementById("content");
  container.appendChild(loader);
};

const removeLoadingSpinner = () => {
  const loader = document.getElementById("loader");
  const container = document.getElementById("content");
  container.removeChild(loader);
};

function search_book() {
  var search = document.getElementById("searchbar").value.toLowerCase();
  var container = document.getElementById("content");

  container.innerHTML = "";
  addLoadingSpinner();
  fetch("https://openlibrary.org/search.json?q=" + search)
    .then((a) => a.json())
    .then((response) => {
      removeLoadingSpinner();
      for (var i = 0; i < response.docs.length; i++) {
        container.innerHTML =
          container.innerHTML +
          '<div class="book">' +
          '<div class="title">' +
          response.docs[i].title +
          "</div>" +
          '<div class="info">' +
          '<img src="http://covers.openlibrary.org/b/isbn/' +
          response.docs[i].isbn[0] +
          '-M.jpg"><br>' +
          "<div>" +
          '<span style="font-weight:500; color:rgb(122, 72, 15)">' +
          "Author: " +
          "</span>" +
          response.docs[i].author_name[0] +
          "<br>" +
          /*'<span style="font-weight:500; color:rgb(122, 72, 15)">'+
                              'Subject: '+
                          '</span>'+
                          response.docs[i].subject[0] +'<br>'+*/
          '<span style="font-weight:500; color:rgb(122, 72, 15)">' +
          "No. of pages: " +
          "</span>" +
          response.docs[i].number_of_pages_median +
          "<br>" +
          '<span style="font-weight:500; color:rgb(122, 72, 15)">' +
          "First publish year: " +
          "</span>" +
          response.docs[i].first_publish_year +
          "<br>" +
          '<div class="rating"></div>' +
          /*'<button id="vm" onclick="display(\''+response.docs[i].key+'\')">view more</button>'+*/

          '<a href="https://openlibrary.org' +
          response.docs[i].key +
          '" id="link">Redirect to the book page</a>';

        "</div>" + "</div>" + "</div>";
        rating(response.docs[i].key, i);
      }
    });
}

//this function wil fetch and display rating out of 5 by rounding it to the latest integer
function rating(url_spec, book_no) {
  fetch("https://openlibrary.org" + url_spec + "/ratings.json")
    .then((a) => a.json())
    .then((response) => {
      var rating = document.getElementsByClassName("rating");
      rating[book_no].innerHTML =
        '<span class="material-symbols-outlined star">star</span>' +
        '<span class="material-symbols-outlined star">star</span>' +
        '<span class="material-symbols-outlined star">star</span>' +
        '<span class="material-symbols-outlined star">star</span>' +
        '<span class="material-symbols-outlined star">star</span>';
      var stars = document.getElementsByClassName("star");

      for (var j = 0; j < Math.round(response.summary.average); j++) {
        stars[book_no * 5 + j].style.color = "rgb(255, 145, 0)";
      }
    });
}

// Improved the functionality by adding Enter button trigger
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchbar").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      search_book();
    }
  });
});
