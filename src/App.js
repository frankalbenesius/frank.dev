import React from "react";
import "./App.css";
import Art from "./Art";

function App() {
  return (
    <div className="App">
      <h1>Frank Albenesius</h1>
      <div className="Links">
        <a href="https://www.github.com/frankalbenesius/">Github</a>
        <a href="https://www.instagram.com/frankalbenesius/">Instagram</a>
        <a href="mailto:frankalbenesius@gmail.com">Email</a>
      </div>
      <Art />
      <div>
        <h2>Projects</h2>
        <Project url="https://ASOIAFBuilder.com" title="ASOIAFBuilder.com">
          An army manager for the A Song of Ice & Fire: Tabletop Miniatures
          Game. Originally built as a side project for my brother, this app had
          over 20,000 unique visitors in 2019.
        </Project>
        <Project url="https://gifs.frank.dev" title="gifs.frank.dev">
          Quickly record and download gifs of yourself.
        </Project>
        <Project url="https://spinner.frank.dev" title="spinner.frank.dev">
          A "spinner" that changes its probabilities based on history. Designed
          for a friend who wanted to make sure all of their students were called
          on in class while still using random selection.
        </Project>
        <Project
          url="https://whatdayisit.frank.dev/"
          title="whatdayisit.frank.dev"
        >
          Because remembering things during a pandemic is hard.
        </Project>
      </div>
    </div>
  );
}

function Project(props) {
  return (
    <div style={{ width: "100%", maxWidth: "30rem", margin: "0 auto 1rem" }}>
      <a href={props.url}>{props.title}</a>
      <br />
      {props.children}
    </div>
  );
}

export default App;
