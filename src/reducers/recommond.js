import { GET_SONGLIST, GET_NEWSONG } from '../constants';

function recomondSonglist(state = { songlist: [] }, action) {
  switch (action.type) {
  case GET_SONGLIST:
    return Object.assign({}, state, {songlist: action.songlist});
  default:
    return state;
  }
}

function recomondNewsong(state = { songs: [] }, action) {
  switch (action.type) {
  case GET_NEWSONG:
    return Object.assign({}, state, {songs: action.songs});
  default:
    return state;
  }
}

export default {
  songlist: recomondSonglist,
  songs: recomondNewsong
};