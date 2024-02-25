const wrapper = document.querySelector(".generator"),
    qrInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code img"),
    downloadBtn=wrapper.querySelector(".btnpng"),
    sharebtn=wrapper.querySelector(".btnshare");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code....";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        downloadBtn.style.display="block";
      
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});
downloadBtn.addEventListener('click',async()=>{
 const response=await fetch(qrImg.src);
 const blob=await response.blob();
 const url=URL.createObjectURL(blob);
 const link=document.createElement('a');
 link.href=url;
 link.download="qr.png";
 link.click();
 URL.revokeObjectURL(url);
})
sharebtn.addEventListener('click',()=>
{
    if (navigator.share) {
        navigator.share({
            title: "QR Code",
            url: qrImg.src
        })
    .then(function() 
    {
    console.log("QR code shared successfully");
    })
    .catch(function(error) {
    console.error("Error sharing QR code:", error);
            });
    } 
    else {
        console.log("Sharing not supported in this browser.");
    }
})