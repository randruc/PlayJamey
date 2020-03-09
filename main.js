var gainL,
    gainR,
    gainMono,
    AudioContext,
    audioContext,
    source,
    range,
    channelSplitter,
    audioElement;

function filechanged(e) {
    let files = e.files;
    let file = URL.createObjectURL(files[0]);
    audioElement.src = file;    
};

function rangechanged(e) {
    if (e.value > 100) {
        gainR.gain.value = 1;
        gainL.gain.value = 1 - (e.value - 100) / 100;
    } else if (e.value < 100) {
        gainR.gain.value = e.value / 100;
        gainL.gain.value = 1;
    } else {
        gainL.gain.value = 1;
        gainR.gain.value = 1;
    }
}

function center() {
    range.value = 100;
    range.dispatchEvent(new Event('change'));
}

window.onload = function () {
    audioElement = document.querySelector('audio');
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audioElement);
    range = document.getElementById("range");

    channelSplitter = audioContext.createChannelSplitter(2);
    gainL = audioContext.createGain();
    gainR = audioContext.createGain();
    gainMono = audioContext.createGain();

    source.connect(channelSplitter);

    channelSplitter.connect(gainL, 0);
    channelSplitter.connect(gainR, 1);

    gainL.connect(gainMono);
    gainR.connect(gainMono);
    gainMono.connect(audioContext.destination);

    center();
}
