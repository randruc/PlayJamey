

console.log('Coucou');

var gainL, gainR, source, audioElement;

function filechanged(e) {
    audioElement = document.querySelector('audio');

    let files = e.files;
    let file = URL.createObjectURL(files[0]);
    audioElement.src = file;

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext();
    let source = audioContext.createMediaElementSource(audioElement);
    let channelSplitter = audioContext.createChannelSplitter(2);
    gainL = audioContext.createGain();
    gainR = audioContext.createGain();
    let gainMono = audioContext.createGain();

    source.connect(channelSplitter);

    channelSplitter.connect(gainL, 0);
    channelSplitter.connect(gainR, 1);


    gainL.connect(gainMono);
    gainR.connect(gainMono);
    gainMono.connect(audioContext.destination);
};

function rangechanged(e) {
    gainL.gain.value = (200 - e.value) / 200;
    gainR.gain.value = e.value / 200;
}
