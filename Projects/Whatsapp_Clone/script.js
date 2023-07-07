let back = document.querySelector('.back');
let chatBox = document.querySelector('.chatBox');
let openChat = document.querySelector('.open');

back.onclick = function () {
    chatBox.classList.add('hide');
}

openChat.onclick = function () {
    chatBox.classList.remove('hide');
};
