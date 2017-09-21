import request from '../libs/fetch';
import {
  SERVERADDRESS,
  REQUESTING,
  CURRENT_INDEX,
  GET_SONGLIST, 
  GET_NEWSONG, 
  GET_SONG,
  GET_LYRIC,
  GET_TOPLIST,
  GET_PLAYLISTDETAIL,
  GET_HOTSINGERS,
  ADD_PLAYLIST, 
  PLAY_STATUS, 
  GET_SONGDETAIL,
  SET_SHOWSTATUS,
  SET_SHEETSTATUS,
  SEARCH
} from '../constants';

function requesting(val) {
  return {
    type: REQUESTING,
    val
  };
}

function setCurrentIndex(currentIndex) {
  return {
    type: CURRENT_INDEX,
    currentIndex
  };
}

function songList(songlist) {
  return {
    type: GET_SONGLIST,
    songlist: songlist.result
  };
}

function newSongs(songs) {
  return {
    type: GET_NEWSONG,
    songs: songs.result
  };
}

function lyric(res) {
  return {
    type: GET_LYRIC,
    lyric: res.lrc.lyric
  };
}

function getSong(song) {
  return {
    type: GET_SONG,
    song
  };
}

function songDetail(song) {
  return {
    type: GET_SONGDETAIL,
    song: song.songs[0]
  };
}

function playPrev() {
  return (dispatch, getState) => {
    let index = getState().stores.currentIndex - 1;
    const length = getState().stores.playSongList.length - 1;
    if (index == -1) {
      index = length;
    }
    return dispatch(setAudioIndex(index));
  };
}

function playNext() {
  return (dispatch, getState) => {
    let index = getState().stores.currentIndex + 1;
    const length = getState().stores.playSongList.length;
    if (index == length) {
      index = 0;
    }
    return dispatch(setAudioIndex(index));
  };
}

function playListDetail(playlist) {
  return {
    type: GET_PLAYLISTDETAIL,
    playlist: playlist.playlist
  };
}

function topList(topList) {
  return {
    type: GET_TOPLIST,
    topList: topList.result
  };
}

function playlist(song) {
  return {
    type: ADD_PLAYLIST,
    song
  };
}

function search(search) {
  return {
    type: SEARCH,
    search: search.result.songs
  };
}

function hotSingers(singers) {
  return {
    type: GET_HOTSINGERS,
    singers: singers.artists
  };
}

function playStatus(status) {
  return {
    type: PLAY_STATUS,
    status
  };
}

function setPlayerBarStatus(status) {
  return {
    type: SET_SHOWSTATUS,
    status
  };
}

function setSheetStatus(status) {
  return {
    type: SET_SHOWSTATUS,
    status
  };
}

function setAudioIndex(index) {
  return (dispatch, getState) => {
    const song = getState().stores.playSongList[index];
    dispatch(setCurrentIndex(index));
    dispatch(getLyric(song.id));
    return dispatch(getSong(song));
  };
}

function getSongList() {
  const url = `${SERVERADDRESS}/personalized`;
  return (dispatch, getState) => {
    const songlist = getState().stores.songlist.songlist;
    if(!songlist.length) {
      return request.get(url).then(res => dispatch(songList(res)));
    }
  };
}

function getLyric(id) {
  const url = `${SERVERADDRESS}/lyric?id=${id}`;
  return (dispatch, getState) => {
    return request.get(url).then(res => dispatch(lyric(res)));
  };
}

function getNewSongs() {
  const url = `${SERVERADDRESS}/personalized/newsong`;
  return (dispatch, getState) => {
    const songs = getState().stores.songs.songs;
    if(!songs.length) {
      return request.get(url).then(res => dispatch(newSongs(res)));
    }
  };
}

function addPlayList(song) {
  const url = `${SERVERADDRESS}/music/url?id=${song.id}`;
  return (dispatch, getState) => {
    const playSongList = getState().stores.playSongList;
    const flag = playSongList.some(item => item.id === song.id);
    if (!flag) {
      const index = playSongList.length;
      dispatch(setCurrentIndex(index));
      return request.get(url).then(res => {
        song.location = res.data[0].url;
        dispatch(getLyric(song.id));
        dispatch(getSong(song));
        return dispatch(playlist(song));
      });
    }
  };
}

function getSongDetail(id) {
  const url = `${SERVERADDRESS}/song/detail?ids=${id}`;
  return (dispatch, getState) => {
    return request.get(url).then(res => dispatch(songDetail(res)));
  };
}

function getTopList() {
  const url = `${SERVERADDRESS}/top/list?idx=5`;
  return (dispatch, getState) => {
    return request.get(url).then(res => dispatch(topList(res)));
  };
}

function getPlayListDetail(id) {
  const url = `${SERVERADDRESS}/playlist/detail?id=${id}`;
  return (dispatch, getState) => {
    const playlist = getState().stores.playlist.playlist;
    if (id != playlist.id) {
      dispatch(requesting(id));
      return request.get(url).then(res => dispatch(playListDetail(res)));
    }
  };
}

function getHotSingers() {
  const url = `${SERVERADDRESS}/top/artists?offset=0&limit=8`;
  return (dispatch, getState) => {
    const singers = getState().stores.hotSingers;
    if (singers.length < 2) {
      return request.get(url).then(res => dispatch(hotSingers(res)));
    }
  };
}

function getSearchRes(val) {
  const url = `${SERVERADDRESS}/search?keywords=${val}`;
  return (dispatch, getState) => {
    return request.get(url).then(res => dispatch(search(res)));
  };
}

export default{
  getSongList,
  getNewSongs,
  getSongDetail,
  getPlayListDetail,
  getTopList,
  getHotSingers,
  getSearchRes,
  addPlayList,
  playStatus,
  playPrev,
  playNext,
  setAudioIndex,
  setPlayerBarStatus,
  setSheetStatus
};