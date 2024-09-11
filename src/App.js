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
      <div>
        <a href="https://buttondown.email/frankdev?tag=website">
          Subscribe to my newsletter
        </a>
      </div>
      <Art />
      <div>
        <h2>Projects</h2>
        <Project
          url="https://poster2020.frank.dev"
          title="Something Good About 2020"
        >
          <i>A Visual Time Capsule & Annual Frank Tradition</i>
          <div>The 2020 iteration of the 2019 poster idea.</div>
        </Project>
        <Project url="https://poster2019.frank.dev" title="The Year Was 2019">
          <i>A Visual Time Capsule & Grass-Fed Collaborative Experience</i>
          <div>
            To celebrate the new year, I asked 72 friends and family to
            participate in a collaborative poster-building project.
          </div>
        </Project>
        <Project url="https://joesbirds.com" title="Joe's Birds">
          My friend Joe needed a place to put his birds. A Contentful CMS
          triggers Netlify deployments on updates.
        </Project>
        <Project url="https://everybeef.com" title="every beef">
          Your one-stop shop for all hex colors that include the word "beef".
          Try beefifying an image!
        </Project>
        <Project url="https://spinner.frank.dev" title="spinner.frank.dev">
          A "spinner" that changes its probabilities based on history. Designed
          for a friend who wanted to make sure all of their students were called
          on in class while still using random selection.
        </Project>
        <Project url="https://table.frank.dev" title="Dire Table">
          A minimal virtual tabletop for D&D and other RPGs. Roll dice. Move
          tokens. Draw basic maps.
        </Project>
        <Project url="https://gifs.frank.dev" title="gifs.frank.dev">
          Scrappy tool for recording gifs of yourself.
        </Project>
        <Project url="https://chords.frank.dev" title="chords.frank.dev">
          A tiny tool to help me generate and practice random chord
          progressions.
        </Project>
        <Project
          url="https://whatdayisit.frank.dev/"
          title="whatdayisit.frank.dev"
        >
          Because remembering things during the pandemic was hard.
        </Project>
        <Project
          url="https://github.com/frankalbenesius/plotter-sketches"
          title="plotter-sketches"
        >
          A repository of some code I used to generate SVGs for pen plotting.
          <br />
          Examples:&nbsp;
          <a href="https://www.instagram.com/p/BxVwG_ZDG2c/">One</a>,&nbsp;
          <a href="https://www.instagram.com/p/BxSSP4pDbgi/">Two</a>
          ,&nbsp;
          <a href="https://www.instagram.com/p/BygOLPPjfTK/">Three</a>
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
