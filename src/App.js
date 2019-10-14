import React from "react";
import SongList from "./components/SongList.js";
import "./App.css";

const data = [
  { name: "1", artist: "1", genre: "1" },
  { name: "2", artist: "2", genre: "2" },
  { name: "3", artist: "3", genre: "3" }
];

function App() {
  return (
    <div className="App">
      <SongList list={data} />
    </div>
  );
}

export default App;
