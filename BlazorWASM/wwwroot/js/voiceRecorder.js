// import { invokeSendAudioOverGrpc_Blazor } from "./blazorInterop";
let audioContext;
let mediaStreamSource;
let delayNode;
let mediaRecorder;

window.startSendingAudio = async function (instance) {

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
        // instance.invokeMethodAsync("StartSendingAudio", event.data)
        // invokeSendAudioOverGrpc_Blazor(event.data)
        // var array = Array.from(new Uint8Array(await audioChunks.arrayBuffer()));

        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", async () => {
        console.log("type of audio chunks", typeof audioChunks);

        // Create a single Blob from all audio chunks
        const audioBlob = new Blob(audioChunks);

        // Convert Blob to ArrayBuffer
        const arrayBuffer = await audioBlob.arrayBuffer();

        // Convert ArrayBuffer to base64 string
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        // Call Blazor method with base64 string
        await instance.invokeMethodAsync("StartSendingAudio", base64String);

        // Reset audioChunks
        audioChunks = [];
    });
};

window.stopSendingAudio = function () {
    mediaRecorder.stop();
    // mediaStreamSource.disconnect(delayNode);
    // delayNode.disconnect(audioContext.destination);
};
