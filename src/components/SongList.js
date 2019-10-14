import React from 'react';
import Song from './components/Song.js/index.js';

const SongList = (props) => (
  <div>
    <h1>Music List</h1>
    {props.list.map((item,i) =>
      <Song key={i} {...item}/>
    )}
  </div>
)

export default SongList;