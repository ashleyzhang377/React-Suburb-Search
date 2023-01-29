// Import React
import React, { useState, useRef } from "react";

// Import Component
import DeleteResult from "../ResultsList/DeleteResult";
import Button from "../Button/Button";

import "./Input.css";
import "../ResultsList/ResultsList.css"

function Input({ placeholder, data}, props) {
  const { className, value, onSelect, items, onClick, ...otherProps } = props;

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  const inputRef = useRef(null);
  const [updated, setUpdated] = useState('');

  const [isOpen, setIsOpen] = useState(true);

  const [isColored, setIsColored] = useState(false);

  let referencja = useRef();

  const openMenuHandler = (event) => {
    if (referencja.current === event.target) {
      setIsOpen(false);
      console.log(" to eventtarget" + event.target);
    }
  };

  const closeMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (event) => {
    setIsOpen(() => (prev) => !prev);

    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      const searchResult = value.name.toLowerCase().startsWith(searchWord.toLowerCase())
      // || value.state.abbreviation.toLowerCase().startsWith(searchWord.toLowerCase());
      return searchResult;
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const addRecentSearch = (searchTerm) => {
    setWordEntered(searchTerm);
    setRecentSearch(prevItems => {
      return [...prevItems, searchTerm];
    });
  }

  const deleteRecentSearch = (searchTerm) => {
    setRecentSearch(prevItems => {
      return prevItems.filter((value, item) => {
        return item !== searchTerm;
      });
    });
  }

  const handleSearchButtonClick = async () => {
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
            ref={inputRef}
            onChange={handleFilter}
            onClick={closeMenuHandler}
          />
          <Button
            onChecked={handleSearchButtonClick}
          />
        </div>
        <div className="filter-style" ref={referencja} onClick={openMenuHandler}>
          {isOpen && <ul className={"ResultsList" + (className || "")} {...otherProps}>
            {filteredData.length !== 0 && (
              <div className="dataResult" onClick={() => setIsOpen(false)}>
                <div className="recentSearch">
                  {recentSearch.length !== 0 && (
                    <p>Recent Searches:</p>
                  )}
                  {recentSearch?.map((value, item) => (
                    <li className="ResultsList-item">
                      <button
                        key={item}
                        className="ResultsList-button recent-icon"
                        onClick={() => addRecentSearch(value)}
                      >
                        {value}
                      </button>
                      <DeleteResult
                        key={item}
                        id={item}
                        onChecked={deleteRecentSearch} />
                    </li>
                  ))}
                </div>
                <div>
                  {filteredData.length !== 0 && (
                    <p>Search Suggestions:</p>
                  )}
                  {filteredData
                    .slice(0, 15)
                    .map((value,) => {
                      return (
                        <li
                          key={value.name + value.state.abbreviation}
                          className="ResultsList-item"
                          href={value.state.abbreviation}
                          target="_blank"
                          onClick={() => addRecentSearch(value.name)}
                        >
                          <button
                            className="ResultsList-button"
                          >
                            <span
                              onChange={() => setIsColored(isColored => !isColored)}
                              style={{ color: isColored ? '' : 'blue' }}
                            >
                              {wordEntered.charAt(0).toUpperCase() + wordEntered.slice(1)}
                            </span>
                            {/* {(value.name + ', ' + value.state.abbreviation).replace(wordEntered, '')} */}
                            {value.name.toLowerCase().replace(wordEntered.toLowerCase(), '') + ', ' + value.state.abbreviation}
                          </button>
                        </li>
                      );
                    })}
                </div>
              </div>
            )}
            {wordEntered.length !== 0 && filteredData.length === 0 && (
              <li className="ResultsList-item">
                <button className="ResultsList-button">No Available Data</button>
              </li>
            )}
          </ul>}
        </div>
      </div>
    </div>
  )
}

export default Input;
