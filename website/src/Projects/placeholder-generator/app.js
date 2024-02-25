const fileInput = document.getElementById('fileinput');
const generateButton = document.querySelector('.generateBtn');


/*============ get image dimenstion ===============*/
generateButton.addEventListener('click', event => {
    if (fileInput.files.length > 0) {
        const img = document.createElement('img');
        const selectedImage = fileInput.files[0];
        const objectURL = URL.createObjectURL(selectedImage);

        img.onload = function handleLoad() {
            console.log(`Width: ${img.width}, Height: ${img.height}`);
            generateImage(img.height,img.width)
            URL.revokeObjectURL(objectURL);
        };

        img.src = objectURL;
    }

    fileInput.value = null;
});



/*================ generate placeholder image  ===================*/
const imagePreview = document.getElementById("imagePreview");
const downloadImage = document.getElementById('download');

function generateImage(imageHeight,imageWidth) {
    const canvasElement = createPlaceholderCanvas(
        imageWidth,
        imageHeight
    );
    const dataUrl = canvasElement.toDataURL();
    
    downloadImage.href = dataUrl;
    imagePreview.src = dataUrl;
    imagePreview.style.display = "block";
    imagePreview.style.maxWidth = `${imageWidth}px`;

    
}

/**
 * Creates a HTML canvas element of the given size.
 *
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
function createPlaceholderCanvas(width, height) {
    const element = document.createElement("canvas");
    const context = element.getContext("2d");
   

    element.width = width;
    element.height = height;

    // Fill in the background
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, element.width, element.height);

    // Place the text
    context.font = "bold 90px sans-serif";
    context.fillStyle = "#333333";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${width}x${height}`, element.width / 2, element.height / 2);

    return element;
}

