import React from 'react';
import SongList from './SongList.js';
import data from './data.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <SongList list={data}/>
    </div>
  );
}

export default App;
