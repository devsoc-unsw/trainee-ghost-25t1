import { useRef } from "react";
import playBtn from '../assets/play.png';
import skipBtn from '../assets/skip.png';
import bgMusic from '../assets/littleroot_town.ogg'
import './MusicPlayer.css';

function MusicPlayer() {

    const bgMusicRef = useRef(new Audio(bgMusic));

    const playMusic = () => {
        if (bgMusicRef.current.paused) {
            bgMusicRef.current.play();
            bgMusicRef.current.volume = 0.3;
            bgMusicRef.current.loop = true;
        } else {
            bgMusicRef.current.pause();
        }
    };

    return (
        <>
            <div className="music-container">
                <div className="music-text">Now Playing: Littleroot Town</div>
                <div className="music-controls">
                    <img className="unskip music-btn" src={skipBtn}/>
                    <img className="play music-btn" src={playBtn} onClick={playMusic}/>
                    <img className="skip music-btn" src={skipBtn}/>
                </div>
            </div>
        </>
    );
}

export default MusicPlayer;
