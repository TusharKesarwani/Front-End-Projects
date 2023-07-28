let username 
let socket = io()

do{

    username = prompt('Enter your name: ')
}while(!username)


const textarea = document.querySelector('textarea')
const submitBtn = document.querySelector('#submitBtn')
const commentBox = document.querySelector('.comment-box')


submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let comment = textarea.value

    if(!comment){
        return
    }65

    postComment(comment)
})


function postComment(comment){

    let data = {
        username: username,
        comment: comment
    }

    appendToDom(data)

    textarea.value = ''

    broadCastComment(data)

    syncWithDb(data)
}



function appendToDom(data){

    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    let markup = `

        <div class="card border-light mb-3">
            <div class="card-body">
                <h6> ${data.username}</h6>
        
                <p>${data.comment}</p>
        
                <div class="posted-time">
                    <img src="./images/clock.png" alt="clock" class="clock-img">
                    <small>${moment(data.time).format('LT')}</small>
                </div>

            </div>
        </div>
    `


    lTag.innerHTML = markup
    commentBox.prepend(lTag)
}



function broadCastComment(data) {

    socket.emit('comment', data)
}

socket.on('comment', (data) => {
    appendToDom(data)
})



textarea.addEventListener('keyup', (e) => {
    socket.emit('typing', {username})
})




let timerId = null

function debounce(func, timer) {

    if(timerId){
        clearTimeout(timerId)
    }


    timerId = setTimeout(() => {
        func()
    }, timer)
}



let typingDiv = document.querySelector('.typing')

socket.on('typing', (data) => {
    typingDiv.innerText = `${data.username} is typing...`

    debounce(function() {
        typingDiv.innerText = ''
    }, 1000)

})




//api calls

function syncWithDb(data) {

    const headers = {
        'Content-Type' : 'application/json'
    }

    fetch('/api/comments', {method: 'Post', body: JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
}



function fetchComments() {
    fetch('/api/comments')
        .then(res => res.json())
        .then(result => {
            result.forEach(comment => {
                comment.time = comment.createdAt
                appendToDom(comment)
            });
            
            console.log(result)
        })
}


window.onload = fetchComments