import React, { useEffect } from 'react';

const DrumKit = () => {
    const keys = [
        { key: 65, letter: 'A', sound: 'Boom', src:'/src/assets/audio/01 - JavaScript Drum Kit_sounds_boom.wav' },
        { key: 83, letter: 'S', sound: 'Clap', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_clap.wav' },
        { key: 68, letter: 'D', sound: 'Hihat', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_hihat.wav' },
        { key: 70, letter: 'F', sound: 'Kick', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_kick.wav' },
        { key: 71, letter: 'G', sound: 'Openhat', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_openhat.wav' },
        { key: 72, letter: 'H', sound: 'Ride', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_ride.wav' },
        { key: 74, letter: 'J', sound: 'Snare', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_snare.wav' },
        { key: 75, letter: 'K', sound: 'Tink', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_tink.wav' },
        { key: 76, letter: 'L', sound: 'Tom', src: '/src/assets/audio/01 - JavaScript Drum Kit_sounds_tom.wav' },
    ];

    const playSound = (e) => {
        const audio = document.querySelector(`audio[data-key="${e}"]`);
        const animation = document.querySelector(`div[data-key="${e}"]`);
        if (!audio) return;

        audio.currentTime = 0;
        audio.play();
        animation.classList.remove('playing')
        void animation.offsetWidth
        animation.classList.add('playing');
    };

    const removeTransition = (e) => {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    };

    const keydown = (e) => {
        const key = e.keyCode;
        playSound(key);
    }

    const touchEnd = (e) => {
        const touch = e.target.closest('.key').getAttribute("data-key")
        playSound(touch)
    }

    useEffect(() => {
        window.addEventListener('keydown', keydown);
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => key.addEventListener('transitionend', removeTransition));
        window.addEventListener("touchend", touchEnd)
    }, []);

    return (
        <div className="main">
            <h1>Drum Kit</h1>
            <div className="bgImg"></div>
            {keys.map(key => (
                <div key={key.key} data-key={key.key} className="key">
                    {key.letter} <span>{key.sound}</span>
                    <audio data-key={key.key} src={key.src}></audio>
                </div>
            ))}
        </div>
    );
};

export default DrumKit;
