// Import React
import React, { useState } from "react";

// Import Component
import Button from "../Button/Button"
import "./Input.css";
import "../ResultsList/ResultsList.css"

function Input({ placeholder, data }, props) {
  const { className, value, onSelect, items, ...otherProps } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

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
          />
          <Button />
        </div>
        <div className="filter-style">
          <ul className={"ResultsList " + (className || "")} {...otherProps}>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData
                .slice(0, 15)
                .map((value, key) => {
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
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Input;
