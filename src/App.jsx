import React, { useEffect } from 'react';
import audio1 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_boom.wav'
import audio2 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_clap.wav'
import audio3 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_hihat.wav'
import audio4 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_kick.wav'
import audio5 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_openhat.wav'
import audio6 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_ride.wav'
import audio7 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_snare.wav'
import audio8 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_tink.wav'
import audio9 from '/src/assets/audio/01 - JavaScript Drum Kit_sounds_tom.wav'

const DrumKit = () => {
    const keys = [
        { key: 65, letter: 'A', sound: 'Boom', src: audio1 },
        { key: 83, letter: 'S', sound: 'Clap', src: audio2},
        { key: 68, letter: 'D', sound: 'Hihat', src: audio3},
        { key: 70, letter: 'F', sound: 'Kick', src: audio4},
        { key: 71, letter: 'G', sound: 'Openhat', src: audio5},
        { key: 72, letter: 'H', sound: 'Ride', src: audio6},
        { key: 74, letter: 'J', sound: 'Snare', src: audio7},
        { key: 75, letter: 'K', sound: 'Tink', src: audio8},
        { key: 76, letter: 'L', sound: 'Tom', src: audio9},
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
