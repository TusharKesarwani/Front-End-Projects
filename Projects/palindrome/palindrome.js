function palindrome_check() {
    var ishtra = document.getElementById("input").value;
    var reg = /[\W_]/g;
    var smallstring = ishtra.toLowerCase().replace(reg, "");
    var reversed = smallstring.split("").reverse().join("");
    if (reversed === smallstring){
        document.getElementById("prog").innerHTML = `<b>"${ishtra}"</b> is a palindrome!.`;
    }
    else {
        document.getElementById("prog").innerHTML = `<b>"${ishtra}"</b> is not a palindrome!.`;
    }    
}
