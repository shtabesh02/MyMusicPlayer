import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'
// import { TbPlayerSkipForward, TbPlayerSkipBack, TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { RxTrackNext } from "react-icons/rx";
import { RxTrackPrevious } from "react-icons/rx";
import { RxPlay } from "react-icons/rx";
import { RxPause } from "react-icons/rx";

import musicplayer from "../assets/songs/musicplayer.png";
import songs from "../assets/songs/songs";
import './player.css';

const Player = () => {
    const [play_pause, setPlay_pause] = useState(false); // change it back to true
    const audioRef = useRef(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showMusic, setShowMusic] = useState(false);
    const [portalSongs, setPortalSongs] = useState(null);
    const isSeeking = false;

    useEffect(() => {
        const ps = document.querySelector('.all_musics');
        setPortalSongs(ps)
    }, [])
    useEffect(() => {
        if(currentTrackIndex){
            play();
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        const updateProgress = () => {
            if (!isSeeking) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
                const progressPercentage = (currentTime / duration) * 100;
                setProgress(progressPercentage);
            }
        };

        audioRef.current.addEventListener('timeupdate', updateProgress);
        return () => {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
        };
    }, [isSeeking]);

    const play = () => {
        audioRef.current.play()
        .then(() => {
            setPlay_pause(true);
        })
        .catch((err) => {
            console.error('Failed to play: ', err);
        })
    };

    const playFromList = (index) => {
        setCurrentTrackIndex(index)
    }
    const pause = () => {
        audioRef.current.pause();
        setPlay_pause(false);
    };

    const prevTrack = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        } else {
            setCurrentTrackIndex(songs.length - 1); // go to the last song
        }
    };

    const nextTrack = () => {
        if (currentTrackIndex < songs.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1)
        } else {
            setCurrentTrackIndex(0) // go to first song
        }
    };

    const handleEnded = () => {
        nextTrack();
    };

    const handleProgressClick = (event) => {
        const clickPosition = event.nativeEvent.offsetX;
        const progressBarWidth = event.target.clientWidth;
        const newProgress = (clickPosition / progressBarWidth) * 100;

        setProgress(newProgress);
        const newTime = (clickPosition / progressBarWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };
    return (
        <div onMouseLeave={() => setShowMusic(false)}> 
            <div className="all_musics">
                <div className="music_menu" onClick={() => setShowMusic(!showMusic)}>
                    <i className="fa-solid fa-bars"></i>
                    <span>All Songs</span>
                </div>
                {showMusic && createPortal(
                    <ul className='songs_list'>
                        {
                            songs.map((song, index) => (
                                
                                <li key={song.id} onClick={() => playFromList(index)}>{song.singer}</li>
                            ))
                        }
                    </ul>, portalSongs)
                    }
            </div>
            <div className='player_container'>
                <div className="image_container">
                    <img src={musicplayer} alt="" />
                </div>
                <audio
                    src={songs[currentTrackIndex].song}
                    ref={audioRef}
                    onEnded={handleEnded}
                ></audio>
                <div className="singer"><p>{songs[currentTrackIndex].singer}</p></div>
                <div className="progress_container" onClick={handleProgressClick}>
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="btns">
                    <span onClick={prevTrack}><RxTrackPrevious /></span>
                    <span onClick={() => {
                        if (play_pause) {
                            pause();
                        } else {
                            play();
                        }
                    }}>
                        {play_pause ? <RxPause /> : <RxPlay />}
                    </span>
                    <span onClick={nextTrack}><RxTrackNext /></span>
                </div>
            </div>
        </div>
    );
}

export default Player;