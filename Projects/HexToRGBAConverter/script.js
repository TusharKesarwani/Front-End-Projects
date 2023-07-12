const hexToRGBA = (hexColor,opacity) => {
    var input = document.getElementById("hex-color").value;
    var output = document.getElementById("rgb-color");
    var hexRegx = /^#[a-fA-F0-9]{6}$|^#[a-fA-F0-9]{3}$/; 

    if (input.match(hexRegx)) {
        var hexColor = input.replace("#", "");
        var r, g, b;

        if (hexColor.length === 3) {
            r = parseInt(hexColor[0] + hexColor[0], 16);
            g = parseInt(hexColor[1] + hexColor[1], 16);
            b = parseInt(hexColor[2] + hexColor[2], 16);
        } else if (hexColor.length === 6) {
            r = parseInt(hexColor.substring(0, 2), 16);
            g = parseInt(hexColor.substring(2, 4), 16);
            b = parseInt(hexColor.substring(4, 6), 16);
        }
        if(!isNaN(opacity) && opacity >= 0 && opacity <= 1)
        {
            output.value = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
        }
        else
        {
            output.value = "rgba(" + r + "," + g + "," + b + ")";
        }
    } 
    else {
        alert('Enter Correct Color code');
    }
}

const convert = () =>{
    var hexColor = document.getElementById("hex-color").value;
    var opacity = document.getElementById("opacity").value;

    if(!isNaN(opacity) && opacity>=0 && opacity<=1)
    {
        hexToRGBA(hexColor,opacity)
    }
    else
    {
        alert('Opacity value should be between [0 - 1]');
    }
}
