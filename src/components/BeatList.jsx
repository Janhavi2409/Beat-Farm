import React, { useRef, useState, useEffect } from "react";
import "./BeatList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faCartPlus,
  faPlay,
  faPause,
  faForward,
  faBackward,
  faRedo,
  faHeart,
  faStar,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import Neon from "../assets/neon.mp3";
import Lofi from "../assets/Lofi.mp3";
import Nightfall from "../assets/nightfall.mp3";
import SloMo from "../assets/slomo.mp3";
import Meeting from "../assets/meeting.mp3";

const BeatList = ({ cart, setCart, isLoggedIn }) => {
  const beats = [
    { name: "Neon Desert", key: "C", bpm: "120", track: Neon },
    { name: "Lofi Study", key: "D", bpm: "130", track: Lofi },
    { name: "Nightfall", key: "D", bpm: "140", track: Nightfall },
    { name: "In Slow Motion", key: "D", bpm: "140", track: SloMo },
    { name: "Meeting with the beautiful", key: "D", bpm: "140", track: Meeting },
  ];

  const audioRef = useRef(new Audio());
  const [playingIndex, setPlayingIndex] = useState(null);
  const timeoutRef = useRef(null);
  const [waveLevels, setWaveLevels] = useState(Array(10).fill(1));
  const [waveCount, setWaveCount] = useState(10);
  const [repeat, setRepeat] = useState(false);
  const [likedSongs, setLikedSongs] = useState({});
  const [ratings, setRatings] = useState({});
  const [showControlBar, setShowControlBar] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const toggleAudio = (index, track) => {
    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
      clearTimeout(timeoutRef.current);
      setShowControlBar(false);
    } else {
      audioRef.current.src = track;
      audioRef.current.play();
      setPlayingIndex(index);
      setShowControlBar(true);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 32;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    }
  };

  const animateWaveform = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const levels = Array.from(dataArrayRef.current).map((value) => {
        const normalizedLevel = value / 128;
        return normalizedLevel > 0.1 ? normalizedLevel : 0.1;
      });
      setWaveLevels(levels);
    }
  };

  useEffect(() => {
    const handleEnded = () => {
      setPlayingIndex(null);
      setShowControlBar(false);
      clearTimeout(timeoutRef.current);
    };

    const currentAudio = audioRef.current;
    currentAudio.addEventListener("ended", handleEnded);
    const intervalId = setInterval(animateWaveform, 100);

    return () => {
      currentAudio.removeEventListener("ended", handleEnded);
      clearTimeout(timeoutRef.current);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updateWaveCount = () => {
      const width = window.innerWidth;
      if (width <= 400) {
        setWaveCount(5);
      } else if (width <= 675) {
        setWaveCount(8);
      } else {
        setWaveCount(10);
      }
    };

    updateWaveCount(); // Initial setting
    window.addEventListener("resize", updateWaveCount);
    return () => window.removeEventListener("resize", updateWaveCount);
  }, []);

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleBackward = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat);
  };

  const handleLike = (index) => {
    setLikedSongs((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const handleRate = (index, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [index]: rating,
    }));
  };

  const toggleShare = (beat) => {
    if (navigator.share) {
      navigator.share({
        title: beat.name,
        text: `${window.location.href} \nCheck out this beat "${beat.name}" with a BPM of ${beat.bpm} and key ${beat.key}.`,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  const handleAddToCart = (beat) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to the cart.");
      return;
    }
    setCart((prevCart) => [...prevCart, beat]);
  };

  const handleForwardStep = () => {
    const nextIndex = (playingIndex + 1) % beats.length;
    toggleAudio(nextIndex, beats[nextIndex].track);
  };

  const handleBackwardStep = () => {
    const prevIndex = (playingIndex - 1 + beats.length) % beats.length;
    toggleAudio(prevIndex, beats[prevIndex].track);
  };

  return (
    <div className="beat-list">
      <div className="header">
        <p>Play</p>
        <p>Track Name</p>
        <p>Waveform</p>
        <p>Key</p>
        <p>BPM</p>
        <p>Actions</p>
      </div>

      {beats.map((beat, index) => (
        <div className="beat-item" key={index}>
          <button className="play-button" onClick={() => toggleAudio(index, beat.track)}>
            <FontAwesomeIcon icon={playingIndex === index ? faPause : faPlay} />
          </button>
          <p>{beat.name}</p>
          <div className="waveform">
            <div className="center">
              {waveLevels.slice(0, waveCount).map((level, waveIndex) => (
                <div
                  key={waveIndex}
                  className="wave"
                  style={{
                    transform: `scaleY(${playingIndex === index ? level : 1})`,
                  }}
                />
              ))}
            </div>
          </div>
          <p>{beat.key}</p>
          <p>{beat.bpm}</p>
          <div className="actions">
            <button className="action-button" onClick={() => toggleShare(beat)}>
              <FontAwesomeIcon icon={faShare} />
            </button>
            <button className="action-button" onClick={() => handleAddToCart(beat)}>
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      ))}

      {showControlBar && (
        <div className="control-bar">
          <button
            className={`control-button ${likedSongs[playingIndex] ? "liked" : ""}`}
            onClick={() => handleLike(playingIndex)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button onClick={handleBackwardStep}><FontAwesomeIcon icon={faBackwardStep} /></button>
          <button onClick={handleBackward}><FontAwesomeIcon icon={faBackward} /></button>
          <button onClick={handleRepeat} className={repeat ? "active" : ""}><FontAwesomeIcon icon={faRedo} /></button>
          <button onClick={handleForward}><FontAwesomeIcon icon={faForward} /></button>
          <button onClick={handleForwardStep}><FontAwesomeIcon icon={faForwardStep} /></button>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={ratings[playingIndex] >= star ? "rated" : ""}
                onClick={() => handleRate(playingIndex, star)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BeatList;
