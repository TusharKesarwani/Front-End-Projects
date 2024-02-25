const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const accordionHeadings = document.querySelectorAll('.accordion-heading');
let searchQuery = "";

const APP_ID = '33b1a0ef';
const APP_key = '5e12645236de1c7eb43b725fd06a49ee';


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generatePagination(data.hits);
  displayItems(data.hits);
}

const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1; // Initially set the current page to 1

// Function to display items for the current page
function displayItems(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  generateHTML(itemsToDisplay);
}

// Function to generate pagination links
function generatePagination(data) {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";
  const pageLinkContainer = document.createElement("div");
  pageLinkContainer.classList.add("pagination");
  paginationContainer.appendChild(pageLinkContainer);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    if (i === 1) {
      pageLink.classList.add("selectedLink");
    }
    pageLink.addEventListener("click", () => {
      currentPage = i;
      displayItems(data);

      let links = pageLinkContainer.childNodes;
      let j = 1;

      for (let link of links) {
        link.classList.remove("selectedLink");
        if (j === i) {
          link.classList.add("selectedLink");
        }
        j++;
      }
    });
    pageLink.classList.add("paginationLink");
    pageLinkContainer.appendChild(pageLink);
  }
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <div class="accordion">
          <div class="accordion-item">
            <h3 class="accordion-heading">Diet Labels</h3>
            <div class="accordion-content">
              <p class="item-data">${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
            </div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-heading">Health Labels</h3>
            <div class="accordion-content">
              <p class="item-data">${result.recipe.healthLabels}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

