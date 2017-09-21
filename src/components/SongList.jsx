import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PIC_PARAMS_250 } from '../constants';

export default class SongList extends Component {
  constructor(props) {
    super(props);
  }
  getPlayCount = (count) => {
    if (count < 10000) {
      return count;
    }
    return `${parseInt(count/10000)}万`;
  }
  render() {
    const { songlist } = this.props;
    const items = songlist.map((song, index) => {
      const picUrl = song.picUrl + PIC_PARAMS_250;
      return (
        <li className="rmsl--item" key={ index }>
          <Link to={'/playlist/' + song.id }>
            <img src={picUrl} alt=""/>
            <p>{ song.name }</p>
            <span>{ this.getPlayCount(song.playCount) }</span>
          </Link>
        </li>
      );
    });
    return (
      <div className="rmsl">
        <h2 className="rmsl--title">推荐歌单</h2>
        <ul className="rmsl--list">
          { items }
        </ul>
      </div>
    );
  }
}
