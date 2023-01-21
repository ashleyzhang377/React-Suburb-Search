// Import React
import React, { useState, useRef } from "react";

// Import Component
import "../Button/Button.css";
import iconPath from "../Button/icons.svg";

import "./Input.css";
import "../ResultsList/ResultsList.css"

function Input({ placeholder, data }, props) {
  const { className, value, onSelect, items, onClick, ...otherProps } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const inputRef = useRef(null);
  const [updated, setUpdated] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      const searchResult = value.name.toLowerCase().startsWith(searchWord.toLowerCase()) || value.state.abbreviation.toLowerCase().startsWith(searchWord.toLowerCase());
      return searchResult;
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const onSearch = (searchTerm) => {
    setWordEntered(searchTerm);
    console.log(searchTerm);
  };

  const handleClick = async() => {
    setUpdated(inputRef.current.value);

    if (updated.length !== 0) {
      alert(`Your most recent suburb selection was: ${updated}`);
    }
  };

  return (
    <div className="bg-container">
      <div>
        <p className="p-style inline-block">Suburb</p>
      </div>
      <div>
        <div className="input-style inline-block">
          <input
            className={"Input" + (className || "")}
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            ref={inputRef}
          />
          <button
            type="button"
            className={"Button" + (className || "")}
            onClick={handleClick}
            {...otherProps}
          >
            <svg viewBox="0 0 24 24" width="24" height="16">
              <use xlinkHref={iconPath + "#dls-icon-arrow-right"} />
            </svg>
          </button>
        </div>
        <div className="filter-style">
          <ul className={"ResultsList " + (className || "")} {...otherProps}>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData
                  .slice(0, 15)
                  .map((value,) => {
                    return (
                      <li
                        key={value.name + value.state.abbreviation}
                        className="ResultsList-item"
                        href={value.state.abbreviation}
                        target="_blank"
                        onClick={() => onSearch(value.name + ', ' + value.state.abbreviation)}
                      >
                        <button className="ResultsList-button">
                          {value.name}, {value.state.abbreviation}
                        </button>
                      </li>
                    );
                  })}
              </div>
            )}
            {wordEntered.length !== 0 && filteredData.length === 0 && (
              <li className="ResultsList-item">
                <button className="ResultsList-button">No Available Data</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Input;
