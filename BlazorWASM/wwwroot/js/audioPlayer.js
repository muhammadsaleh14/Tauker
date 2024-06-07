

window.playAudio = async function (audioData) {
    let audioContext;
let mediaStreamSource;
let delayNode;
    console.log("this is audio data", audioData)

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    mediaStreamSource = audioContext.createMediaStreamSource(audioData);


    // mediaStreamSource.connect(delayNode);
    // delayNode.connect(audioContext.destination);
};

