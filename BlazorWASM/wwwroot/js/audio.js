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