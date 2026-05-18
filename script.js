const bgImages = [
    'assets/bgimg1.png',
    'assets/bgimg2.png',
    'assets/bgimg3.png',
    'assets/bgimg4.png',
    'assets/bgimg5.png',
    'assets/bgimg6.png',
    'assets/bgimg7.png',
];

const tips = [
    "I love red jailbird",
    "He has the fu*king micro",
    "REDACTED",
    "Im the best SL player"
];

const container = document.getElementById('bg-container');
const slides = [];
let currentSlide = 0;
let slideInterval, tipInterval;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

shuffle([...bgImages]).forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'bg-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${src}')`;
    container.appendChild(div);
    slides.push(div);
});

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

let tipIndex = 0;
function rotateTip() {
    const el = document.getElementById('tip-text');
    el.style.opacity = 0;
    el.style.transition = 'opacity 0.4s';
    setTimeout(() => {
        tipIndex = (tipIndex + 1) % tips.length;
        el.textContent = tips[tipIndex];
        el.style.opacity = 1;
    }, 400);
}

function enterSite() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();

    const audio = document.getElementById('bgmusic');
    audio.volume = 1;
    audio.play();

    document.getElementById('splash').style.display = 'none';
    document.getElementById('main').classList.remove('hidden');

    slideInterval = setInterval(nextSlide, 8000);
    tipInterval = setInterval(rotateTip, 6000);

    audio.addEventListener('pause', () => audio.play());
    audio.addEventListener('volumechange', () => { if (audio.volume < 1) audio.volume = 1; });

    document.addEventListener('keydown', e => {
        if (e.code === 'Space' || e.key === 'k' || e.key === 'K') e.preventDefault();
    });
}

function startPresentation() {
    const main = document.getElementById('main');
    main.onclick = null;

    const overlay = document.getElementById('fade-overlay');
    const audio = document.getElementById('bgmusic');

    overlay.classList.add('fading');

    setTimeout(() => {
        clearInterval(slideInterval);
        clearInterval(tipInterval);
        main.classList.add('hidden');

        fadeMusicOut(audio, 600);

        const presentation = document.getElementById('presentation');
        presentation.style.display = 'block';
        presentation.onclick = showPlayer;

        document.getElementById('presentation-video').play();

        overlay.classList.remove('fading');
    }, 650);
}

function showPlayer() {
    document.getElementById('presentation').onclick = null;

    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('fading');

    setTimeout(() => {
        const presentation = document.getElementById('presentation');
        presentation.style.display = 'none';
        
        const presentationVideo = document.getElementById('presentation-video');
        if (!presentationVideo.paused && presentationVideo.readyState >= 2) {
            presentationVideo.pause();
        }

        const kavadaView = document.getElementById('kavada-view');
        kavadaView.style.display = 'block';
        kavadaView.onclick = showInfamousInvictis;

        const kavadaVideo = document.getElementById('kavada-video');
        kavadaVideo.play();

        overlay.classList.remove('fading');
    }, 650);
}

function showInfamousInvictis() {
    document.getElementById('kavada-view').onclick = null;

    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('fading');

    setTimeout(() => {
        const kavadaView = document.getElementById('kavada-view');
        kavadaView.style.display = 'none';

        const kavadaVideo = document.getElementById('kavada-video');
        if (!kavadaVideo.paused && kavadaVideo.readyState >= 2) {
            kavadaVideo.pause();
        }

        const infamousInvictisView = document.getElementById('infamous-invictis-view');
        infamousInvictisView.style.display = 'block';
        infamousInvictisView.onclick = showTaviogu;

        const infamousInvictisVideo = document.getElementById('infamous-invictis-video');
        infamousInvictisVideo.play();

        overlay.classList.remove('fading');
    }, 650);
}

function showTaviogu() {
    document.getElementById('infamous-invictis-view').onclick = null;

    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('fading');

    setTimeout(() => {
        const infamousInvictisView = document.getElementById('infamous-invictis-view');
        infamousInvictisView.style.display = 'none';

        const infamousInvictisVideo = document.getElementById('infamous-invictis-video');
        if (!infamousInvictisVideo.paused && infamousInvictisVideo.readyState >= 2) {
            infamousInvictisVideo.pause();
        }

        const tavioguView = document.getElementById('taviogu-view');
        tavioguView.style.display = 'block';
        tavioguView.onclick = showSilentTogi;

        const tavioguVideo = document.getElementById('taviogu-video');
        tavioguVideo.play();

        overlay.classList.remove('fading');
    }, 650);
}

function showSilentTogi() {
    document.getElementById('taviogu-view').onclick = null;

    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('fading');

    setTimeout(() => {
        const tavioguView = document.getElementById('taviogu-view');
        tavioguView.style.display = 'none';

        const tavioguVideo = document.getElementById('taviogu-video');
        if (!tavioguVideo.paused && tavioguVideo.readyState >= 2) {
            tavioguVideo.pause();
        }

        const silentTogiView = document.getElementById('silent-togi-view');
        silentTogiView.style.display = 'block';

        const silentTogiVideo = document.getElementById('silent-togi-video');
        silentTogiVideo.play();

        overlay.classList.remove('fading');
    }, 650);
}

function fadeMusicOut(audio, duration) {
    const startVol = audio.volume;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;
    const fadeInterval = setInterval(() => {
        step++;
        audio.volume = Math.max(0, startVol * (1 - step / steps));
        if (step >= steps) {
            clearInterval(fadeInterval);
            audio.pause();
            audio.volume = 0;
        }
    }, stepTime);
}
