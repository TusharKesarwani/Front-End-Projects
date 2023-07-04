// console.log(Html5QrcodeScanner);
const scanner = new Html5QrcodeScanner('reader',{
    qrbox : {
        width: 250,
        height: 250,
    },
    fps : 20,
});

scanner.render(success,error);
function success(result) {
    // console.log(result);
    document.getElementById('result').innerHTML =  
    `
        <h2>Success!</h2>
        <p><a href="${result}">${result}</a></p>
    `;

    scanner.clear();
    document.getElementById('reader').remove();
}

function error(err){
    console.log(err);
}