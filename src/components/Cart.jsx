import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMoneyBill, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

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
    <div>
      {cart.length === 0 ? (
        <div className="empty-list">
          <p className="message">Cart is empty</p>
          <div className="loader">
            <div className="wrapper">
              <div className="catContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 733 673"
                  className="catbody"
                >
                  <path
                    fill="#212121"
                    d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
                  ></path>
                  <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
                  <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 158 564"
                  className="tail"
                >
                  <path
                    fill="#191919"
                    d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
                  ></path>
                </svg>
                <div className="text">
                  <span className="bigzzz">Z</span>
                  <span className="zzz">Z</span>
                </div>
              </div>
              <div className="wallContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 500 126"
                  className="wall"
                >
                  <line strokeWidth="6" stroke="#7C7C7C" y2="3" x2="450" y1="3" x1="50"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="85" x2="400" y1="85" x1="100"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="122" x2="375" y1="122" x1="125"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="1.99391" x2="115.5" y1="43.0061" x1="115.5"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="2.00002" x2="189" y1="43.0122" x1="189"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="2.00612" x2="262.5" y1="43.0183" x1="262.5"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="2.01222" x2="336" y1="43.0244" x1="336"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="2.01833" x2="409.5" y1="43.0305" x1="409.5"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="153" y1="84.0122" x1="153"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="228" y1="84.0122" x1="228"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="303" y1="84.0122" x1="303"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="378" y1="84.0122" x1="378"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="192" y1="125.012" x1="192"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="267" y1="125.012" x1="267"></line>
                  <line strokeWidth="6" stroke="#7C7C7C" y2="84" x2="342" y1="125.012" x1="342"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
  
};

export default Cart;
