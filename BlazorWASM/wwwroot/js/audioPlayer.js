window.playAudio = async function (audioData) {
    try {
        console.log("In js file playing audio")
        // Check if audioData is a Uint8Array
        if (!(audioData instanceof Uint8Array)) {
            console.error("audioData should be an instance of Uint8Array");
            return;
        }

        // Create an AudioContext
        let audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Decode audio data into an AudioBuffer
        let audioBuffer = await audioContext.decodeAudioData(audioData.buffer);

        // Create an AudioBufferSourceNode
        let sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;

        // Create a delay node
        let delayNode = audioContext.createDelay();
        delayNode.delayTime.value = 0.5; // Set delay time in seconds

        // Connect the nodes
        sourceNode.connect(delayNode);
        delayNode.connect(audioContext.destination);

        // Start playback
        sourceNode.start(0);

        console.log("Playing audio with delay effect");

    } catch (error) {
        console.error("Error in playing audio:", error);
    }
};
