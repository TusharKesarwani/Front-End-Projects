let qrText = document.querySelector('.qr-text input');
let qrCodeContainer = document.getElementById('qr-code');
let qrCode;
function generateQR() {
    qrCode = new QRCode(qrCodeContainer, {
        text: `${qrText.value}`,
        width: 450,
        height: 450,
    });
    
    $('.qr-code-container').removeClass('d-none');
    let imgSrc ="";
    $('#qr-code img').on('load', function() {
        imgSrc = $(this).attr('src');
        $('.download-btn').attr('href', imgSrc);
    });
}

$('button').on('click', () => {
    if(qrCode){
        qrCode.clear();
    }
    if(qrText !== '') {
        qrCodeContainer.innerHTML = "";
        generateQR();
    } else{
        console.error("Empty value");
    }
})

$('form').on('submit', (e) => {
    e.preventDefault();
})

// Handle Social Medias Links
const socialLinks = [
    'https://github.com/Kushalshakya/JavaScriptProjects/tree/main/QRCode',
]

$('.social-media img').each((index, media) => {
    $(media).on('click', () => {
        console.log(index);
        window.open(socialLinks[index], '_blank');
    })
})