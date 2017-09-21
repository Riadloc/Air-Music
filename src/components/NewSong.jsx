import React, { Component } from 'react';
import { PIC_PARAMS_50 } from '../constants';

class NewSong extends Component {
  render() {
    const {songs, playAudio, type} = this.props;
    const items = songs.map((song, index) => {
      const Cover = function () {
        const cover = song.cover + PIC_PARAMS_50;
        switch (type) {
        case 'order':
          return (
            <div className="rmns--item_cover">
              <span>{ index + 1 }</span>
            </div>);
        case 'simple':
          return <div style={{display: 'none'}}></div>;
        default:
          return (
            <div className="rmns--item_cover">
              <img src={cover} alt="" />
            </div>);
        }
      };
      return (
        <li className="rmns--item" key={index} onClick={() => playAudio(song)}>
          <Cover/>
          <div className="rmns--item_text">
            <h2>{ song.name }</h2>
            <h6>{ song.singer }-{ song.album }</h6>
          </div>
          <div className="rmns--item_icon">
            <i className="iconfont icon-play2"></i>
          </div>
        </li>
      );
    });
    return (
      <ul className="rmns--list">
        { items }
      </ul>
    );
  }
}


export default NewSong;