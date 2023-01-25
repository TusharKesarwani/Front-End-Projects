var a = document.getElementById('assignment');
    b = document.getElementById('attendance');
    c = document.getElementById('announcement');
    d = document.getElementById('resources');
    e = document.getElementById('testcentre');
    f = document.getElementById('profile');

a.addEventListener("click", function(){
    a.checked = true;
    a.style.backgroundColor = rgb(70, 70, 70);
});
b.addEventListener("click", function onClick() {
    b.style.backgroundColor =  rgb(70, 70, 70);});
c.addEventListener("click", function onClick(){
 c.style.backgroundColor = rgb(70, 70, 70);});
d.addEventListener("click", function onClick() {
    d.style.backgroundColor = rgb(70, 70, 70);});
e.addEventListener('click', function onClick(){
    e.style.backgroundColor = rgb(70, 70, 70);});
f.addEventListener('click', function onClick() {
   f.style.backgroundColor = rgb(70, 70, 70);});