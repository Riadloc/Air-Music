import {
  REQUESTING,
  GET_SONG,
  GET_LYRIC,
  GET_TOPLIST,
  GET_SONGDETAIL,
  CURRENT_INDEX,
  ADD_PLAYLIST,
  PLAY_STATUS,
  SET_SHOWSTATUS,
  GET_PLAYLISTDETAIL 
} from '../constants';

function currentIndex(state= 0, action) {
  switch (action.type) {
  case CURRENT_INDEX: 
    return action.currentIndex;
  default:
    return state;
  }
}

function playSongList(state= [], action) {
  switch (action.type) {
  case ADD_PLAYLIST: 
    return [...state, action.song];
  default:
    return state;
  }
}

function topList(state = {
  topList: {
    name: '',
    coverImgUrl: '',
    trackCount: 0,
    tags: [],
    tracks: [{
      id: 0,
      name: '',
      artists: [{name: ''},],
      album: {name: '', picUrl: ''}
    },]
  }
}, action) {
  switch (action.type) {
  case GET_TOPLIST: 
    return {...state, topList: action.topList};
  default:
    return state;
  }
}

function lyric(state = '', action) {
  switch (action.type) {
  case GET_LYRIC:
    return action.lyric;
  default:
    return state;
  }
}

function playingSong(state= {song: {
  id: '',
  name: 'Attack On Titan',
  artist: '泽野弘之',
  picUrl: '/images/default_cover.jpg',
  location: ''
}}, action) {
  switch (action.type) {
  case GET_SONG: 
    return {...state, song: action.song};
  default:
    return state;
  }
}

function songDetail(state= {song:{ al: {picUrl: ''},name: '', ar: [{name: ''}] }}, action) {
  switch (action.type) {
  case GET_SONGDETAIL: 
    return {...state, song: action.song};
  default:
    return state;
  }
}

function playlistDetail(state= {isFetching: false, playlist: {id: '',creator: {avatarUrl:'',nickname:''}, tracks: [], coverImgUrl: '',name: '',tags:[],description:''}},
  action) {
  switch (action.type) {
  case REQUESTING:
    return {...state, isFetching: true};
  case GET_PLAYLISTDETAIL: 
    return {...state, isFetching: false, playlist: action.playlist};
  default:
    return state;
  }
}

function playStatus(state= {status: 'pause'}, action) {
  switch (action.type) {
  case PLAY_STATUS: 
    return {...state, status: action.status};
  default:
    return state;
  }
}

function showStatus(state= {status: 'show'}, action) {
  switch (action.type) {
  case SET_SHOWSTATUS: 
    return {...state, status: action.status};
  default:
    return state;
  }
}

function sheetStatus(state= {status: 'close'}, action) {
  switch (action.type) {
  case SET_SHOWSTATUS: 
    return {...state, status: action.status};
  default:
    return state;
  }
}

export default {
  playSongList,
  playingSong,
  currentIndex,
  songDetail,
  lyric,
  topList,
  playlist: playlistDetail,
  status: playStatus,
  show: showStatus,
  open: sheetStatus
};