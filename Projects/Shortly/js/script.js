const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};

const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");
const hamburger = selectElement(".hamburger");
const navMenu = selectElement(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value;

  shortenUrl(url);
});

async function shortenUrl(url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    const newUrl = document.createElement("div");
    newUrl.classList.add("item");
    newUrl.innerHTML = `
   <p> ${data.result.short_link}</p>
   <button class="newUrl-btn" >Copy</button>
   `;
    result.prepend(newUrl);
    const copyBtn = result.querySelector(".newUrl-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
    });
    input.value = "";
  } catch (err) {
    console.log(err);
  }
}
