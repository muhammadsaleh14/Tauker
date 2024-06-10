window.blazorInterop = {
    blazorInstance: null,

    registerBlazorMethod: function (blazorInstance) {
        window.blazorInterop.blazorInstance = blazorInstance;
    },

    SendAudioOverGrpc_Blazor: function () {
        if (window.blazorInterop.blazorInstance) {
            window.blazorInterop.blazorInstance.invokeMethodAsync('StartSendingAudio');
        }
    }
};

// Function to be called from anywhere within your separate JavaScript file
function invokeSendAudioOverGrpc_Blazor() {
    console.log("Calling Blazor method from external function");
    window.blazorInterop.SendAudioOverGrpc_Blazor();
}

// Export the function so it can be imported in other JavaScript files
export { invokeSendAudioOverGrpc_Blazor };
