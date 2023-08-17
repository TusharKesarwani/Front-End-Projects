const generateMemeBtn = document.querySelector(".generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const loader = document.querySelector(".loader-container");

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.innerHTML = title;
  memeAuthor.innerHTML = `Meme by: ${author}`;
};

const generateMeme = () => {
  loader.style.display = "flex";
  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) => {
      /* hide the loader element*/
      loader.style.display = "none";

      /*store the meme title*/
      localStorage.setItem("memeTitle", data.title);
      updateDetails(data.url, data.title, data.author);
    });
};

generateMemeBtn.addEventListener("click", generateMeme);
generateMeme();
