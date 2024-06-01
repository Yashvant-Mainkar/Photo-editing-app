const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const img = document.getElementById('img');


const tracks = [
    { 
        title: 'Track 1', 
        src: './mp3-now.com - Bon Iver  Holocene Lyrics_320kbps.mp3',
        imgSrc : "./imges/image (1).jpg"
     },
    { 
        title: 'Track 2', 
        src: './mp3-now.com - IlluminatiAaveshamJithu MadhavanFahadh FaasilSushin ShyamDabzeeVinayak NazriyaAnwar Rasheed_320kbps.mp3',
        imgSrc : "./imges/Anime JUJUTSU KAISEN Watch Online Free - Aniwave - Google Chrome 21-10-2023 01_01_01.png",
     },
    { 
        title: 'Track 3', 
        src: 'music/track3.mp3' ,
        imgSrc : "./imges/Aniwave - Berserk Watch Anime Online - Google Chrome 03-09-2023 01_25_54.png"
    }
];
const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});
const muteBtn = document.getElementById('mute');

function toggleMute() {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
}

muteBtn.addEventListener('click', toggleMute);
const progressBar = document.getElementById('progress-bar');

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

audio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audio.duration);
    durationEl.textContent = duration;
});

audio.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audio.currentTime);
    currentTimeEl.textContent = currentTime;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
const shuffleBtn = document.getElementById('shuffle');
let isShuffling = false;

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleBtn.textContent = isShuffling ? 'Shuffle On' : 'Shuffle Off';
}

function nextTrack() {
    if (isShuffling) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = 'Pause';
}

shuffleBtn.addEventListener('click', toggleShuffle);


progressBar.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});
const animationBar = document.getElementById('animation-bar');

function playTrack() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = 'Pause';
        animationBar.classList.add('playing');
    } else {
        audio.pause();
        playBtn.textContent = 'Play';
        animationBar.classList.remove('playing');
    }
}

audio.addEventListener('play', () => {
    animationBar.classList.add('playing');
});

audio.addEventListener('pause', () => {
    animationBar.classList.remove('playing');
});

audio.addEventListener('ended', () => {
    animationBar.classList.remove('playing');
});


let currentTrackIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    img.src = track.imgSrc
    trackTitle.textContent = track.title;
}

function playTrack() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playBtn.textContent = 'Play';
    }
}


function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = 'Pause';
    
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = 'Pause';
}

playBtn.addEventListener('click', playTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

audio.addEventListener('ended', nextTrack);

// Load the first track initially
loadTrack(currentTrackIndex);
