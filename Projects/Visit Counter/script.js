const count = document.getElementById('count');

updateVisitorCount();

function updateVisitorCount(){
    fetch('https://api.countapi.xyz/update/project/visit?amount=1')
        .then(res => res.json())
        .then(res => {
            count.innerHTML = res.value;
    })
}

//API used : https://countapi.xyz/
// https://api.countapi.xyz/update/project/visit?amount=1
