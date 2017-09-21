import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewSong from '../components/NewSong';
import './Search.styl';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      status: 0
    };
  }
  render() {
    const { singers, searchresult, playAudio } = this.props;
    const items = singers.map((singer, index) => <li key={index}>{singer.name}</li>);
    const songs = searchresult.map(song => {
      return {
        id: song.id,
        cover: song.album.picUrl,
        name: song.name,
        singer: song.artists[0].name,
        album: song.album.name
      };
    });
    return (
      <div className="search">
        <form className="search-bar" method="get" action="#" onSubmit={this.submit}>
          <div className="search-bar_wrapper">
            <i className="iconfont icon-chaxun"></i>
            <input type="search" name="search" autoComplete="off"
              value={this.state.value} onChange={this.handleChange} placeholder="搜索歌曲、歌手、专辑"/>
          </div>
        </form>
        <div className="search-content">
          { !this.state.status ? 
            <div className="search-hot">
              <h2>热门搜索</h2>
              <ul className="search-hot-list">
                { items }
              </ul>
            </div> :
            <div className="search-result">
              <NewSong songs={songs} playAudio={playAudio} type="simple"/>
            </div>
          }
        </div>
      </div>
    );
  }
  handleChange = (event) => {
    const {value} = event.target;
    this.setState({ value });
    if (!value) {
      this.setState({ status: 0 });
    }
  }
  submit = (event) => {
    event.preventDefault();
    this.props.search(this.state.value);
    this.setState({
      status: 1
    });
  }
}

const mapStateToProps = (state) => {
  return {
    searchresult: state.stores.searchRes
  };
};

export default connect(mapStateToProps)(Search);