let VoiceOn = true;

function clicked() {
    const inputId = document.getElementById('peer-id').value;
    PW.connectToVoice(inputId)
}

function callclicked() {
    const callId = document.getElementById('target-peerid').value;
    PW.callUser(callId)
}

function AllowVoice() {
    if (VoiceOn == true) {
        VoiceOn = false;
        PW.setMyVolume(0.0);
    } else {
        VoiceOn = true;
        PW.setMyVolume(1.0);
    }
}