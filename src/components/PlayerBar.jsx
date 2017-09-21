import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PlayerBar.styl';

class PlayerBar extends Component {
  render() {
    const {audio,playlist,status,show} = this.props;
    const song = playlist.slice(-1)[0];
    const styles = {
      display: (song ? 'block' : 'none')
    };
    const PlayStatusIcon = (status === 'play') ?
      <i className="iconfont icon-pause" onClick={() => this.toggleStatus()}></i> :
      <i className="iconfont icon-play" onClick={() => this.toggleStatus()}></i>;
    return (
      <div className="playerbar" style={styles}>
        <audio src={audio.location} id="Audio"/>
        { song && show === 'show' &&
            <div className="playerbar-content clearfix">
              <div className="info">
                <div className="info__cover">
                  <Link to={'/player/' + audio.id }>
                    <img src={audio.picUrl} alt=""/>
                  </Link>
                </div>
                <div className="info__text">
                  <p>{ audio.name }</p>
                </div>
              </div>
              <div className="controls">
                <i className="iconfont icon-huitui"></i>
                {PlayStatusIcon}
                <i className="iconfont icon-kuaijin"></i>
              </div>
            </div>
        }
      </div>
    );
  }
  componentDidMount() {
    this.audio = document.getElementById('Audio');
    this.initialAudio();
  }
  initialAudio = () => {
    const defaultVolume = 0.5;
    this.audio.volume = defaultVolume;
    this.audio.oncanplay = () => {
      this.audio.play();
      this.props.playStatus('play');
    };
    this.audio.onended = () => {
      this.toggleStatus();
    };
  };
  toggleStatus = () => {
    if(this.props.status === 'play') {
      this.audio.pause();
      this.props.playStatus('pause');
    } else {
      this.audio.play();
      this.props.playStatus('play');
    }
  };
}


export default PlayerBar;
