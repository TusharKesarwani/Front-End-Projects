const generateMemeBtn = document.querySelector(".generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const loader = document.querySelector(".loader-container");
const downloadBtn = document.querySelector(".download-meme-btn");

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

generateMeme();

const downloadMeme = () => {
  const imageUrl = memeImage.getAttribute("src");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();

  // Set up a cross-origin attribute to avoid CORS issues
  img.setAttribute("crossorigin", "anonymous");

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${localStorage.getItem("memeTitle")}.jpg` || "meme.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.src = imageUrl;
};

downloadBtn.addEventListener("click", downloadMeme);
generateMemeBtn.addEventListener("click", generateMeme);
