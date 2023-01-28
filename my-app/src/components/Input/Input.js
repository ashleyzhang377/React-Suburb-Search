// Import React
import React, { useState, useRef } from "react";

// Import Component
import ResultsList from "../ResultsList/ResultsList";
import Button from "../Button/Button";

import "./Input.css";
import "../ResultsList/ResultsList.css"

function Input({ placeholder, data }, props) {
  const { className, value, onSelect, items, onClick, ...otherProps } = props;

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  const inputRef = useRef(null);
  const [updated, setUpdated] = useState('');

  const [isOpen, setIsOpen] = useState(true);

  let referencja = useRef();

  const handler = (event) => {
    if (referencja.current === event.target) {
      setIsOpen(false);
      console.log(" to eventtarget" + event.target);
    }
  };

  const handleOpen = () => {
    setIsOpen(() => (prev) => !prev);
  };

  const handleFilter = (event) => {
    handleOpen();

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

  const handleClick = async () => {
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
          <Button
            onChecked={handleClick}
          />
        </div>
        <div
          className="filter-style"
          ref={referencja}
          onClick={handler}
        >
          {isOpen && <ul className={"ResultsList" + (className || "")} {...otherProps}>
            {filteredData.length !== 0 && (
              <div className="dataResult">
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
                      <ResultsList
                        key={item}
                        id={item}
                        onChecked={deleteRecentSearch} />
                    </li>
                  ))}
                </div>
                <br />
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
                          onClick={() => addRecentSearch(value.name + ', ' + value.state.abbreviation)}
                        >
                          <button className="ResultsList-button">
                            {value.name}, {value.state.abbreviation}
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
