void async function playAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an oscillator node
    const oscillator = audioContext.createOscillator();

    // Set the oscillator type (sine, square, sawtooth, triangle)
    oscillator.type = 'sine';

    // Generate a random frequency between 200 and 2000 Hz
    const randomFrequency = Math.random() * (2000 - 200) + 200;
    oscillator.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);

    // Create a gain node to control the volume
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to 10%

    // Connect the oscillator to the gain node
    oscillator.connect(gainNode);

    // Connect the gain node to the audio context destination (speakers)
    gainNode.connect(audioContext.destination);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after 2 seconds
    oscillator.stop(audioContext.currentTime + 2);

    console.log(`Playing random tone at frequency: ${randomFrequency} Hz`);
}