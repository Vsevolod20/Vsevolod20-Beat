class Drumkit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.palyBtn = document.querySelector('.play');
        this.currentKick = "./allSounds/kick-big.wav";
        this.currentSnare = "./allSounds/snare-noise.wav";
        this.currentClap = "./allSounds/clap-808.wav";
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.clapAudio = document.querySelector('.clap-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
           bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
           if (bar.classList.contains('active')) {
            if (bar.classList.contains('kick-pad')) {
                this.kickAudio.currentTime = 0;
                this.kickAudio.play();
            }
            if (bar.classList.contains('snare-pad')) {
                this.snareAudio.currentTime = 0;
                this.snareAudio.play();
            }
            if (bar.classList.contains('clap-pad')) {
                this.clapAudio.currentTime = 0;
                this.clapAudio.play();
            }
           }
        })
        this.index++;
    }
    start() {
        const interval = (60/this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } 
    }
    activePad() {
        this.classList.toggle('active');
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.palyBtn.innerText = 'Stop';
            this.palyBtn.classList.add('active');
        } else {
            this.palyBtn.innerText = 'Play';
            this.palyBtn.classList.remove('active');
        }
    }
    changeSound(e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;
        switch (selectName) {
            case 'kick-select':
                this.kickAudio.src = selectValue;
            break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
            break;
            case 'clap-select':
                this.clapAudio.src = selectValue;
            break;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute('data-track')
        e.target.classList.toggle('active')

        if (e.target.classList.contains('active')){
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.clapAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.clapAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
       if (playBtn.classList.contains('active')) {
           this.start();
       }
    }
}

let drumkit = new Drumkit();

drumkit.palyBtn.addEventListener('click', function() {
    drumkit.updateBtn();
    drumkit.start();
})
drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function() {
        pad.style.animation = '';
    })
})
drumkit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumkit.changeSound(e);
    })
})
drumkit.muteBtns.forEach(btn => {
   btn.addEventListener('click', function(e) {
       drumkit.mute(e);
   })
})

drumkit.tempoSlider.addEventListener('input', function(e) {
    drumkit.changeTempo(e);
})
drumkit.tempoSlider.addEventListener('input', function(e) {
    drumkit.updateTempo(e);
})
