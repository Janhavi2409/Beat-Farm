import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMoneyBill, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "./BeatList.css";

const Cart = ({ cart, setCart }) => {
  const audioRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [waveLevels, setWaveLevels] = useState(Array(10).fill(1));
  const [waveCount, setWaveCount] = useState(10);
  const [pauseTimeout, setPauseTimeout] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const setupAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  };

  const animateWaveform = () => {
    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const levels = Array.from(dataArrayRef.current).map((value) => {
        const normalizedLevel = value / 128;
        return normalizedLevel > 0.1 ? normalizedLevel * 1.25 : 0.1;
      });
      setWaveLevels(levels);
    }
  };

  const toggleAudio = (index, track) => {
    if (playingIndex === index) {
      audioRef.current.pause();
      clearTimeout(pauseTimeout);
      setPlayingIndex(null);
    } else {
      audioRef.current.src = track;
      audioRef.current.play();
      setPlayingIndex(index);
      setupAudioContext();

      clearTimeout(pauseTimeout);
      const timeoutId = setTimeout(() => {
        audioRef.current.pause();
        setPlayingIndex(null);
      }, 30000);
      setPauseTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;

    const handleEnded = () => {
      setPlayingIndex(null);
      clearTimeout(pauseTimeout);
    };

    currentAudio.addEventListener("ended", handleEnded);
    const intervalId = setInterval(animateWaveform, 100);

    return () => {
      currentAudio.removeEventListener("ended", handleEnded);
      clearInterval(intervalId);
    };
  }, [pauseTimeout]);

  const handleResize = () => {
    setWaveCount(window.innerWidth <= 780 ? 7 : 10);
  };

  const handleRemoveFromCart = (beatToRemove) => {
    setCart((prevCart) => prevCart.filter((beat) => beat.name !== beatToRemove.name));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      {cart.map((beat, index) => (
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
            <button className="action-button" onClick={() => handleRemoveFromCart(beat)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="action-button" onClick={() => handleCheckout(beat)}>
              <FontAwesomeIcon icon={faMoneyBill} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
