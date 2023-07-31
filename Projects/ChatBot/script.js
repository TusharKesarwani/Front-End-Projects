const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn =  document.querySelector(".chat-input span");
const chatbox =  document.querySelector(".chatbox");
const chatbotToggler =  document.querySelector(".chatbot-toggler");
const closeBtn =  document.querySelector(".close-btn");

let userMessage = null; //variable to store user's message

const API_KEY = "PASTE YOUR API KEY";  //Paste your API key here....How to generate is explained in README.md
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    //create a chat <li> element with passed message and className 
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; //return the chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    //define the properties and message for the api request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],   
        })
    }

    //send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); //Get user enetred message and remove extra whitespace
    if(!userMessage) return;

    //clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;  //resetting the textarea height to its default height once a message is sent

    //append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
}
chatInput.addEventListener("input", () => {
    //Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    //if enter key is pressed without shift key and the window 
    //width is greater than the 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", ()=> document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", ()=> document.body.classList.toggle("show-chatbot"));

