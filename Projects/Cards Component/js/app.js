function myFunction() {
    var checkBox = document.getElementById("togglecheck");
    var basic = document.getElementById("basic");
    var pro = document.getElementById("professional");
    var master = document.getElementById("master");

    if (checkBox.checked == true) {
        basic.innerHTML = "1.99"
        pro.innerHTML = "2.99"
        master.innerHTML = "3.99"
    } else {
        basic.innerHTML = "14.99"
        pro.innerHTML = "24.99"
        master.innerHTML = "34.99"
    }
}