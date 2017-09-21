import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwipeableView from '../components/SwipeableView';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SongList from '../components/SongList';
import NewSong from '../components/NewSong';
import TopList from '../components/TopList';
import Search from '../components/Search';

import actions from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }
  render() {
    const {songlist, songs, toplist, singers} = this.props;
    const newSongs = songs.map(song => {
      return {
        id: song.song.id,
        cover: song.song.album.picUrl,
        name: song.name,
        singer: song.song.artists[0].name,
        album: song.song.album.name
      };
    });
    return (
      <div className="App">
        <Header
          activeTab = { this.state.activeTab }
          handleTabChange = { this.handleTabChange } 
        />
        <SwipeableView
          value = { this.state.activeTab }>
          <div className="rm-content">
            <SongList songlist={songlist}/>
            <div className="rmns">
              <h2 className="rmns--title">推荐新歌</h2>
              <NewSong songs={newSongs} playAudio={this.playAudio}/>
            </div>
          </div>
          <TopList toplist={toplist}  playAudio={this.playAudio}/>
          <Search
            singers={singers}
            search={this.props.actions.getSearchRes}
            playAudio={this.playAudio}/>
        </SwipeableView>
        <Footer/>
      </div>
    );
  }

  log = () => {
    console.log('???');
  }

  handleTabChange = (activeTab) => {
    this.setState({
      activeTab
    });
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
  
  componentDidMount() {
    this.props.actions.getSongList();
    this.props.actions.getNewSongs();
    this.props.actions.getTopList();
    this.props.actions.getHotSingers();
  }
}

const mapStateToProps = (state) => {
  return {
    songlist: state.stores.songlist.songlist,
    songs: state.stores.songs.songs,
    playlist: state.stores.playPlayList,
    audio: state.stores.playingSong.song,
    toplist: state.stores.topList.topList,
    singers: state.stores.hotSingers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
