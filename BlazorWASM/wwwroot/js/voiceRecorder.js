// import { invokeSendAudioOverGrpc_Blazor } from "./blazorInterop";



window.startSendingAudio = async function () {
    let audioContext;
    let mediaStreamSource;
    let delayNode;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    delayNode = audioContext.createDelay();
    delayNode.delayTime.value = 0.5; // 0.5 second delay

    // mediaStreamSource.connect(delayNode);
    // delayNode.connect(audioContext.destination);

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        console.log("data availible")
        invokeSendAudioOverGrpc_Blazor(event.data)
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
        //     const audioBlob = new Blob(audioChunks);
        //     const audioUrl = URL.createObjectURL(audioBlob);
        //     const audio = new Audio(audioUrl);
        audioChunks = [];
        //     audio.play();
    });
};

window.stopSendingAudio = function () {
    mediaRecorder.stop();
    mediaStreamSource.disconnect(delayNode);
    delayNode.disconnect(audioContext.destination);
};
