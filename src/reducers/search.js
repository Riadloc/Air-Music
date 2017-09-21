import { GET_HOTSINGERS, SEARCH } from '../constants';

function hotSingers(state=[{
  id: 0,
  name: '',
  picUrl: ''
},], action) {
  switch (action.type) {
  case GET_HOTSINGERS:
    return action.singers;
  default:
    return state;
  }
}

function searchRes(state = [{
  id: 0,
  name: '',
  artists: [{name: ''},],
  album: {name: '', picUrl: ''}
},], action) {
  switch (action.type) {
  case SEARCH:
    return action.search;
  default:
    return state;
  }
}

export default{
  hotSingers,
  searchRes
};