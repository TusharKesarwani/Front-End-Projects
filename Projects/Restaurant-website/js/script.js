//navbar collapse on losing focus
// $(function () {
//   //$ here serves same as the DOM content loaded
//   $("#navbarToggle").blur(function (event) {
//     //$ here acts as a jquery selector
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       $("#navbarTogglerDemo02").collapse("hide");
//     }
//   });
// });

//loading of main content on homepage
(function (global) {
  var bb = {};
  var homepage = "homepage.html";
  // var menupage = "snippets/menupage.html";

  var insertHtml = function (selector, html) {
    var targetElement = document.querySelector(selector);
    targetElement.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='loading.gif'></div>";
    insertHtml(selector, html);
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");

    $.get(
      // $ajaxUtils.sendGetRequest() is now updates to only $.get()
      homepage,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  global.$bb = bb;
})(window);

var i = 0;
var txt = "From our kitchen to your plate with love.";
var speed = 200;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
