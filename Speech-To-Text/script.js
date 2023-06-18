click_to_record.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").innerHTML = transcript;
        console.log(transcript);
    });
    
    if (speech == true) {
        recognition.start();
    }
})
click_to_copy.addEventListener('click',function(){
    var copyText = document.getElementById("convert_text")
    navigator.clipboard.writeText(copyText.value)
    alert("Text copied")
})
// function UpperFunc() {
//     let text =  getElementById("convert_text")
//     let result = text.toUpperCase();
//     alert(result);
// }