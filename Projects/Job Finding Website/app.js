$(".card").on("click", function(){
    $(".detail").addClass("active");
});

$(".close-detail").on("click",function(){
    $(".detail").removeClass("active")
});

$(".menu-bar").on("click",function(){
    $(".sidebar").addClass("active")
});

$(".logo").on("click",function(){
    $(".sidebar").removeClass("active")
});