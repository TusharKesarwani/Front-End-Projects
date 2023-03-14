const img = document.getElementById('image');
const input = document.getElementById('input');
const grab = document.getElementById('grab');


grab.addEventListener('click', () =>{
    const favicon = `https://www.google.com/s2/favicons?sz=32&domain_url=${input.value}`;
    img.src = favicon;
})
