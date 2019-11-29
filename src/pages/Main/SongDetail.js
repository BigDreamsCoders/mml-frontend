import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { withRouter } from "react-router-dom";

class SongDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const song = this.props.location.song;
    return(
      <MainLayout>
        <h1>{song.title}</h1>
        <h3>{song.musicians.name}</h3>
        <h3> {song.genre.name} </h3>
        <p> {song.description} </p>
        <p> {song.length} </p>
        <p> {song.productionDate} </p>
        <p> Rating: {song.rating}</p>
        <a href={song.youtubeLink}>
          <p>Youtube link</p>
        </a>
        <img src={song.thumbNail} className="card-img" alt=""></img>
      </MainLayout>
    );
  }
}

export default withRouter(SongDetail);
