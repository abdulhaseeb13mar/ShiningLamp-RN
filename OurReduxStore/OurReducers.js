import ActionTypes from './actionTypes';
import {combineReducers} from 'redux';

const userState = {};
let crntPrdtState = {};
let FavItems = [];

const OurUserReducer = (st = userState, action) => {
  switch (action.type) {
    case ActionTypes.USER_INFO:
      st = Object.assign({}, st, {...action.payload});
      return st;

    default:
      break;
  }
  return st;
};

const OurCrntPrdtReducer = (state = crntPrdtState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PRODUCT:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const OurToggleFav = (state = FavItems, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVOURITE:
      let isUnique = true;
      let arr = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          isUnique = false;
          break;
        }
      }
      isUnique && arr.push({...action.payload});
      return arr;

    case ActionTypes.REMOVE_FAVOURITE:
      arr = state.filter((item) => item.id !== action.payload);
      return arr;

    default:
      break;
  }
  return state;
};

export default combineReducers({
  OurToggleFav,
  OurCrntPrdtReducer,
  OurUserReducer,
});
