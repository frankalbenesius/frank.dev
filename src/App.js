import React from "react";
import "./App.css";
import Art from "./Art";

function App() {
  return (
    <div className="App">
      <h1>Frank Albenesius</h1>
      <Art />
      <div className="Links">
        <h2>Links</h2>
        <a href="https://www.github.com/frankalbenesius/">github</a>
        <a href="https://www.instagram.com/frankalbenesius/">instagram</a>
        <a href="mailto:frankalbenesius@gmail.com">email</a>
      </div>
      <div>
        <h2>Projects</h2>
        <div>ASOIAFBuilder</div>
        <div>GIFs</div>
        <div>Spinner</div>
      </div>
    </div>
  );
}

export default App;
