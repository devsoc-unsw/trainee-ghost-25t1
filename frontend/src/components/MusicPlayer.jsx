import { useEffect, useRef } from "react";
import playBtn from '../assets/play.png';
import plusBtn from '../assets/plus.png';
import minusBtn from '../assets/minus.png';
import bgMusic from '../assets/bg.ogg';
import './MusicPlayer.css';

// Make this a global variable so it doesn't get recreated every rerender
const audio = new Audio(bgMusic);
audio.volume = 0.3;
audio.loop = true;

function MusicPlayer() {
    const bgMusicRef = useRef(null);
    bgMusicRef.current = audio;

    const playMusic = () => {
        if (bgMusicRef.current.paused) {
            bgMusicRef.current.play();

        } else {
            bgMusicRef.current.pause();
        }
    };

    const increaseVolume = () => {
        bgMusicRef.current.volume = Math.min(bgMusicRef.current.volume + 0.1, 1);
        console.log(bgMusicRef.current.volume)
    }

    const decreaseVolume = () => {
        bgMusicRef.current.volume = Math.max(bgMusicRef.current.volume - 0.1, 0);
        console.log(bgMusicRef.current.volume)
    }

    return (
        <>
            <div className="music-container">
                <div className="music-text">Now Playing: Peak Music</div>
                <div className="music-controls">
                    <img className="unskip music-btn" src={minusBtn} onClick={decreaseVolume}/>
                    <img className="play music-btn" src={playBtn} onClick={playMusic}/>
                    <img className="skip music-btn" src={plusBtn} onClick={increaseVolume}/>
                </div>
            </div>
        </>
    );
}

export default MusicPlayer;
