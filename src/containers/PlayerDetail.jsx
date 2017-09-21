import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'material-ui/Slider';
import { PIC_PARAMS_500 } from '../constants';
import actions from '../actions';

class PlayerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  render() {
    const {audio,status,song,lyric} = this.props;
    const PlayStatusIcon =  (status === 'play') ?
      <i className="iconfont icon-pause" onClick={() => this.toggleStatus()}></i> :
      <i className="iconfont icon-play" onClick={() => this.toggleStatus()}></i>;
    const sliderStyle = {
      margin: '0'
    };
    const lyricArr = this.procLyric(lyric);
    const activeIdx = this.offsetLyric(lyricArr);
    const Lyric = lyricArr.map((item,index) => {
      const color = index === activeIdx ? {color: '#000', fontSize: '17px'} : {};
      return (
        <p key={index} style={color}>{ item.txt }</p>
      );
    });
    const styles = {
      transform: `translate(0,${-40 * activeIdx}px)`
    };
    const bgImg = {
      backgroundImage: `url(${audio.picUrl + PIC_PARAMS_500})`
    };
    const formatTime = (val) => {
      const time = val;
      const seconds = parseInt(time % 60) || 0;
      const minutes = parseInt(time / 60) || 0;
      return `${minutes}:${seconds}`;
    };
    return (
      <div className="player">
        <div className="player-header">
          <i className="iconfont icon-back" onClick={this.goBack}></i>
        </div>
        <div className="player-content">
          <div className="player-content_cover" style={bgImg}></div>
          <div className="player-content_text">
            <h2>{ audio.name }</h2>
            <h6>{ audio.artist }</h6>
          </div>
          <div className="player-content_slider">
            <div className="startime">{ formatTime(this.currentTime) }</div>
            <Slider 
              style={{flex: '1'}}
              sliderStyle={sliderStyle} 
              value={this.state.value} 
              onChange={this.onChange}/>
            <div className="endtime">{ formatTime(this.duration) }</div>
          </div>
          <div className="player-content_controls">
            <i className="iconfont icon-repeat"></i>
            <i className="iconfont icon-huitui" onClick={this.playPrev}></i>
            { PlayStatusIcon }
            <i className="iconfont icon-kuaijin" onClick={this.playNext}></i>
            <i className="iconfont icon-format-list-bulleted" onClick={this.openPlayList}></i>
          </div>
          <div className="player-content_lyrics">
            <div className="plc_lyrics-wrapper" style={styles}>
              { Lyric }
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.audio = document.getElementById('Audio');
    this.props.actions.setPlayerBarStatus('hide');
    this.clock = setInterval(() => {
      const { currentTime, duration } = this.audio;
      this.currentTime = currentTime || 0;
      this.duration = duration || 240;
      this.setState({
        value: currentTime / duration
      });
    }, 1000);
  }
  componentWillUnmount() {
    this.props.actions.setPlayerBarStatus('show');
    clearInterval(this.clock);
  }
  toggleStatus = () => {
    if(this.props.status === 'play') {
      this.audio.pause();
      this.props.actions.playStatus('pause');
    } else {
      this.audio.play();
      this.props.actions.playStatus('play');
    }
  }
  offsetLyric = (arr) => {
    let idx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i+1<arr.length && arr[i+1].time > this.currentTime &&
          arr[i].time <= this.currentTime) {
        idx = i;break;
      } else if (i+1 == arr.length) {
        idx = i;
      }
    }
    return idx;
  }
  procLyric = (lyric) => {
    if (lyric) {
      const lyrics = lyric.split('\n');
      const lrcArr = [];
      const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
      for (let i = 0; i < lyrics.length; i++) {
        const timeRegExpArr = lyrics[i].match(timeReg);
        if (!timeRegExpArr) continue;
        const txt = lyrics[i].replace(timeReg, '');
        const min = Number(String(timeRegExpArr[0].match(/\[\d*/i)).slice(1));
        const sec = Number(String(timeRegExpArr[0].match(/:\d*/i)).slice(1));
        const time = min * 60 + sec;
        lrcArr.push({time, txt});
      }
      return lrcArr;
    }
    return [{time: 0, txt: '没有歌词得嘛'}];
  };
  playPrev = () => {
    this.props.actions.playPrev();
  }
  playNext = () => {
    this.props.actions.playNext();
  }
  onChange = (e, value) => {
    const { duration } = this.audio;
    this.audio.currentTime = duration * value;
  }
  goBack = () => {
    this.props.history.go(-1);
  }
  openPlayList = () => {
    this.props.actions.setSheetStatus('open');
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.stores.playSongList,
    audio: state.stores.playingSong.song,
    status: state.stores.status.status,
    song: state.stores.songDetail.song,
    lyric: state.stores.lyric
  };
};

const mapDispatchToProps = (dispatch) => {
  //console.log('Main.js mapDispatchToProps');
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail);
