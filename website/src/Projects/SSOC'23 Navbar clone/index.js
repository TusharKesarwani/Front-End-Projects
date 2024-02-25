let navbar = document.getElementById("navbar")
let main = document.getElementById("main")

let theme = document.getElementById("theme")

navbar.style.background = "#ffab01"
main.style.border = "5px solid #ffab01"

function chooseTheme() {
    let color = theme.value
    navbar.style.background = color
    main.style.border = "5px solid " + color
}