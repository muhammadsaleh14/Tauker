// wwwroot/js/audio.js
window.audioRecorder = {
    startRecording: async function (instance) {
        console.log("Start recording");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.ondataavailable = function (event) {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = function () {
            console.log("Recording stopped in JS");
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async function () {
                const base64String = reader.result.split(',')[1];
                await instance.invokeMethodAsync("ReceiveAudioData", base64String);
                // DotNet.invokeMethodAsync('BlazorWASM', '', base64String);
            };
        };

        mediaRecorder.start();
        window.audioRecorder.mediaRecorder = mediaRecorder;
    },
    stopRecording: function () {
        console.log("Stop recording");
        window.audioRecorder.mediaRecorder.stop();
    }
};

window.audioPlayer = {
    playAudio: async function (base64AudioData) {
        console.log("Playing audio in JS");
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBytes = Uint8Array.from(atob(base64AudioData), c => c.charCodeAt(0));
        const audioBuffer = await audioContext.decodeAudioData(audioBytes.buffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
};




// function playAudio(audioData) {
//     console.log(audioData)

//     var blob = new Blob([1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
//     var blobURL = window.URL.createObjectURL(blob);
//     console.log("this is the new blob", blob)
//     var audio = new Audio(blobURL);
//     console.log(audio)

//     var blobURL = window.URL.createObjectURL(blob);
//     // audioPlayer = document.getElementById("audioPlayer");
//     // audioPlayer.src = blobURL; // Assign the audio source
//     // audioPlayer.play();

// }

// function dataUriToBinary(dataUri) {
//     // Split the Data URI into the base64-encoded string part
//     const base64Index = dataUri.indexOf('base64,') + 'base64,'.length;
//     const base64String = dataUri.substring(base64Index);

//     // Decode the base64 string
//     const raw = window.atob(base64String);

//     // Create a binary array
//     const binaryArray = new Uint8Array(raw.length);
//     for (let i = 0; i < raw.length; i++) {
//         binaryArray[i] = raw.charCodeAt(i);
//     }

//     return binaryArray;
// }
// // const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// //     // Create an oscillator node
// //     const oscillator = audioContext.createOscillator();

// //     // Set the oscillator type (sine, square, sawtooth, triangle)
// //     oscillator.type = 'sine';

// //     // Generate a random frequency between 200 and 2000 Hz
// //     const randomFrequency = Math.random() * (2000 - 200) + 200;
// //     oscillator.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);

// //     // Create a gain node to control the volume
// //     const gainNode = audioContext.createGain();
// //     gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to 10%

// //     // Connect the oscillator to the gain node
// //     oscillator.connect(gainNode);

// //     // Connect the gain node to the audio context destination (speakers)
// //     gainNode.connect(audioContext.destination);

// //     // Start the oscillator
// //     oscillator.start();

// //     // Stop the oscillator after 2 seconds
// //     oscillator.stop(audioContext.currentTime + 2);

// //     console.log(`Playing random tone at frequency: ${randomFrequency} Hz`);