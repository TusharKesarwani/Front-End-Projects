document.addEventListener("DOMContentLoaded", function (event) {
    function searchPin() {
        let pin = document.getElementById("pincode").value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.postalpincode.in/pincode/${pin}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                createHTML(data);
            }
        };
        xhr.send();
    }
    function createHTML(data) {
        let htmlElements = " ";
        let msg = "";
        if (data[0].Status === "Success") {
            let city = data[0].PostOffice[0].District;
            htmlElements = 'City :' + city;
        } else {
            htmlElements = "Invalid Pincode";
        }
        let htmlView = document.getElementById("result");
        htmlView.innerHTML = htmlElements;
    }
    document.getElementById("check-pincode-btn").addEventListener("click", searchPin);
});


