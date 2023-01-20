/* 
For this coding exercise, there are three parts that I didn’t do well:

1. The API-Link (ref: Line45 - src/App.js)
I am confident that the way I used to fetch data from API link works perfect, as I tried the other link that I used in the past 
`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`, things went pretty much well and the autocomplete field pops up. However, when 
I changed it to the API_URL = "http://localhost:8010/proxy/suburbs.json?q=“, nothing happens.

2. I didn’t writhe the code separately in the ./Input, ./Button and ./ResultList file, instead, I put them all in app.css. If 
I have more time, I would definitely could split my code and put them into these files so that the APP.css will not contain too many things.

3. As I couldn’t use the API_URL link and don’t know the content inside it, I did not modify the CSS of displayed autofill content and 
didn’t set an onClick function to “search” button.
If I have time, I will write an onClick to allow search button fetch related results from API data.

Thank you for reading these comments.
*/

import React, { useEffect, useState, useRef } from "react";
import iconPath from "./components/Button/icons.svg";
import "./components/Button/Button.css"
import "./App.css";
import "./components/Input/Input.css"
import "./components/ResultsList/ResultsList.css"

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

const API_SAMPLE = [
  { name: "Sydney South", state: { abbreviation: "NSW" } },
  { name: "Sydney", state: { abbreviation: "NSW" } },
  { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
  { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
  { name: "Sydenham", state: { abbreviation: "VIC" } }
];

/**
 * <Input
 *   className="MyInput"
 *   data-something="Value"
 *   value="Hello, World!"
 *   onChange={(value) => console.log('You typed', value)}
 * />
 *
 * @prop {string} value The default value for the input.
 * @prop {string} placeholder The placeholder text.
 * @prop {Function} onChange Callback that will receive current input value.
 * @prop {mixed} ... All other props will be forwarded to the native DOM input.
 */

const Auto = (props) => {
  const { onClick, className, items, onSelect, value, onChange, ...otherProps } = props;

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const suburb = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(API_URL)); // If I change this URL to other API, e.g.: https://pokeapi.co/api/v2/pokemon-form/${i + 1}, it works fine. While it doesn't work with the provided API
    Promise.all(promises).then(suburbArr => {
      return suburbArr.map(value =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            suburb.push({ name, sprite })
          )
      );
    });
    setOptions(suburb);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatesbbDex = sbb => {
    setSearch(sbb);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
    <section>
    <div className="same">
      <p className="p-style">Suburb</p>
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="ABC Suburb Search"
        value={search}
        onChange={event => setSearch(event.target.value)}
        className={"Input " + (className || "")}
        type="text"
        {...otherProps}
      />
      <button
        type="button"
        className={"Button " + (className || "")}
        onClick={onClick}
        {...otherProps}
      >
        <svg viewBox="0 0 24 24" width="24" height="16">
          <use xlinkHref={iconPath + "#dls-icon-arrow-right"} />
        </svg>
      </button>
    </div>
    </section>
      {display && (
          <div className="autoContainer">
            {options
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updatesbbDex(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.name}</span>
                    <img src={value.sprite} alt="suburb" />
                  </div>
                );
              })}
          </div>
        )}
    </div>
  );
};


export default function App() {
  return (
    <div className="App">
    <div className="logo"></div>
    <div className="auto-container">
      <Auto />
    </div>
  </div>

  );
}