import React from 'react';

const Song = (props) => (
  <div>
    <h2>{props.name}</h2>
    <p>Artist: {props.artist}</p>
    <p>Genre: {props.genre}</p>
  </div>
)

export default Song;
