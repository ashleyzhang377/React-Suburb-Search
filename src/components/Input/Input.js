import React, { useState } from "react";
import "./Input.css";
import Button from "../Button/Button"
import "../ResultsList/ResultsList.css"

function Input({ placeholder, data }, props) {
  const { className, value, onChange, onSelect, items, ...otherProps } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.state.abbreviation.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
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
          />
          <Button />
        </div>
        <div className="filter-style">
          <ul className={"ResultsList " + (className || "")} {...otherProps}>
            {filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <li
                      key={"item" + key}
                      className="ResultsList-item"
                      href={value.state.abbreviation}
                      target="_blank"
                      onClick={() => onSelect && onSelect(value)}
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
