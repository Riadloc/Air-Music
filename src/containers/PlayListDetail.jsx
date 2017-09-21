import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PIC_PARAMS_50, PIC_PARAMS_250 } from '../constants';
import Spinner from '../components/Spinner';
import SongList from '../components/NewSong';
import actions from '../actions';

class PlayListDetail extends Component {
  render() {
    const { playlist, isFetching } = this.props;
    const coverImgUrl = playlist.coverImgUrl + PIC_PARAMS_250;
    const avatarUrl = playlist.avatarUrl + PIC_PARAMS_50;
    const styles = {
      backgroundImage: `url(${coverImgUrl})`
    };
    const songs = playlist.tracks.map(song => {
      return {
        id: song.id,
        cover: song.al.picUrl,
        name: song.name,
        singer: song.ar[0].name,
        album: song.al.name
      };
    });
    const tags = playlist.tags.map((tag, index) => <em key={index}>{ tag }</em>);
    return (
      <div className="playlist-detail">
        { isFetching ? <Spinner/> : 
          <div className="playlist-detail-wrapper">
            <div className="pld-head">
              <i className="iconfont icon-back" onClick={this.goBack}></i>
              <div className="pld-head_bg" style={styles}></div>
              <div className="pld-head_wrap">
                <div className="pld-head_cover">
                  <img src={ playlist.coverImgUrl } alt=""/>
                </div>
                <div className="pld-head_info">
                  <h2>{ playlist.name }</h2>
                  <div className="pld-head_info_creator">
                    <img src={playlist.creator.avatarUrl} alt=""/>
                    { playlist.creator.nickname }
                  </div>
                </div>
              </div>
            </div>
            <ul className="pld-intro">
              <li><span>标签：</span>{tags}</li>
              <li>
                <span>简介：</span>
                {playlist.description ? playlist.description.split('\n')[0] : '暂无简介'}
              </li>
            </ul>
            <ul className="pld-songlist">
              <div className="pld-songlist_title">歌曲列表</div>
              <SongList songs={songs} playAudio={this.playAudio} type="order"/>
            </ul>
          </div>
        }
      </div>
    );
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.actions.getPlayListDetail(id);
  }
  playAudio = (song) => {
    const { addPlayList, getAudioSrc, playStatus } = this.props.actions;
    document.getElementById('Audio').pause();
    playStatus('pause');
    const audio = {
      id: song.id,
      name: song.name,
      artist: song.singer,
      picUrl: song.cover
    };
    addPlayList(audio);
  }
  goBack = () => {
    this.props.history.go(-1);
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.stores.playlist.playlist,
    isFetching: state.stores.playlist.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayListDetail);
