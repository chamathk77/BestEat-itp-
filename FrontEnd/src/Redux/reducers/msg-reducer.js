import {msgConstants} from '../Actions/constants'

const initState = {
  msg: [],
  loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
      case msgConstants.CREATE_MSG_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case msgConstants.CREATE_MSG_SUCCESS:
        state = {
          ...state,
          loading: false,
          msg: action.payload,
        };
        break;
      case msgConstants.CREATE_MSG_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case msgConstants.FETCH_MSG_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case msgConstants.FETCH_MSG_SUCCESS:
        state = {
          ...state,
          loading: false,
          msg: action.payload,
        };
        break;
      case msgConstants.FETCH_MSG_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case msgConstants.DELETE_MSG_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case msgConstants.DELETE_MSG_SUCCESS:
        state = {
          ...state,
          loading: false,
          msg: action.payload,
        };
        break;
      case msgConstants.DELETE_MSG_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case msgConstants.UPDATE_MSG_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case msgConstants.UPDATE_MSG_SUCCESS:
        state = {
          ...state,
          loading: false,
          msg: action.payload,
        };
        break;
      case msgConstants.UPDATE_MSG_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
    }
    return state;
  };