import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import PlayerDetail from './PlayerDetail';
import PlayListDetail from './PlayListDetail';
import PlayBar from '../components/PlayerBar';
import BottomSheet from '../components/BottomSheet';
import Mask from '../components/Mask';
import actions from '../actions';
import './Main.styl';

class Main extends Component {
  render() {
    const { playlist, audio, status, show, open } = this.props;
    return (
      <Router>
        <CSSTransition classNames='fade' timeout={300}>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/player/:id' component={PlayerDetail}/>
                <Route path='/playlist/:id' component={PlayListDetail}/>
              </Switch>
              <PlayBar
                audio={ audio }
                show={ show }
                playlist = { playlist }
                status={status}
                playStatus={this.props.actions.playStatus}
              />
              <BottomSheet title="播放列表"
                playlist={playlist}
                open={open}
                play={this.play}
                
              />
              <Mask open={open}
                close={this.props.actions.setSheetStatus.bind(this, 'close')}/>
            </div>
          </MuiThemeProvider>
        </CSSTransition>
      </Router>
    );
  }
  log = (val) => {
    console.log(val);
  }
  play = (index) => {
    this.props.actions.setAudioIndex(index);
  }
}

const mapStateToProps = (state) => {
  return {
    songlist: state.stores.songlist.songlist,
    songs: state.stores.songs.songs,
    playlist: state.stores.playSongList,
    audio: state.stores.playingSong.song,
    status: state.stores.status.status,
    show: state.stores.show.status,
    open: state.stores.open.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);