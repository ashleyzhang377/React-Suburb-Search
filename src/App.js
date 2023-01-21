import React from "react";
import "./App.css";
import Input from "./components/Input/Input"
import APISample from "./API_SAMPLE.json"

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

function App() {
  return (
    <div className="App">
      <sector>
        <Input placeholder="ABC Suburb Search" data={APISample} />
        {/* <Input placeholder="ABC Suburb Search" data={API_URL} /> */}
      </sector>
    </div>
  );
}

export default App;