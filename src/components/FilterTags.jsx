import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'; 
import "./FilterTags.css";

const FilterTags = () => {
  const [selectedTags, setSelectedTags] = useState({
    genre: true, // Initially checked
    mood: false,
    instrument: false,
    key: false,
    bpm: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [name]: checked,
    }));
  };

  return (
    <div>
      <div className="container">
        <div className="tabs">
          <input
            type="checkbox"
            id="checkbox-genre"
            name="genre"
            checked={selectedTags.genre}
            onChange={handleChange}
          />
          <label className="tab" htmlFor="checkbox-genre">
            Genre
            {selectedTags.genre && <FontAwesomeIcon icon={faX} className="icon" />} {/* Show icon when checked */}
          </label>

          <input
            type="checkbox"
            id="checkbox-mood"
            name="mood"
            checked={selectedTags.mood}
            onChange={handleChange}
          />
          <label className="tab" htmlFor="checkbox-mood">
            Mood
            {selectedTags.mood && <FontAwesomeIcon icon={faX} className="icon" />}
          </label>

          <input
            type="checkbox"
            id="checkbox-instrument"
            name="instrument"
            checked={selectedTags.instrument}
            onChange={handleChange}
          />
          <label className="tab" htmlFor="checkbox-instrument">
            Instrument
            {selectedTags.instrument && <FontAwesomeIcon icon={faX} className="icon" />}
          </label>

          <input
            type="checkbox"
            id="checkbox-key"
            name="key"
            checked={selectedTags.key}
            onChange={handleChange}
          />
          <label className="tab" htmlFor="checkbox-key">
            Key
            {selectedTags.key && <FontAwesomeIcon icon={faX} className="icon" />}
          </label>

          <input
            type="checkbox"
            id="checkbox-bpm"
            name="bpm"
            checked={selectedTags.bpm}
            onChange={handleChange}
          />
          <label className="tab" htmlFor="checkbox-bpm">
            BPM
            {selectedTags.bpm && <FontAwesomeIcon icon={faX} className="icon" />}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterTags;
