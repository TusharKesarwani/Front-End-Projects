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
  generateHTML(data.hits);
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

  // Add event listeners to accordion headings
  const accordionHeadings = document.querySelectorAll('.accordion-heading');
  accordionHeadings.forEach((heading) => {
    heading.addEventListener('click', () => {
      heading.nextElementSibling.classList.toggle('active');
    });
  });
}