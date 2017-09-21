import React, { Component } from 'react';
import SongList from '../components/NewSong';

import './TopList.styl';

class TopList extends Component {
  render() {
    const { toplist, playAudio } = this.props;
    const bgImg = {
      backgroundImage: `url(${toplist.coverImgUrl})`
    };
    const songs = toplist.tracks.map(song => {
      return {
        id: song.id,
        cover: song.album.picUrl,
        name: song.name,
        singer: song.artists[0].name,
        album: song.album.name
      };
    });
    return (
      <div className="toplist">
        <div className="toplist-head">
          <div className="toplist-head_cover" style={bgImg}></div>
          <div className="toplist-head_name">UK</div>
        </div>
        <div className="toplist-content">
          <SongList songs={songs} playAudio={playAudio} type="order"/>
        </div>
      </div>
    );
  }
}

export default TopList;
