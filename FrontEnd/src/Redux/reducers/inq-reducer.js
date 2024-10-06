import { inqConstants } from "../Actions/constants";

const initState = {
  inquiry:{},
  inquiries: [],
  loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
      case inqConstants.GETALL_INQ_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case inqConstants.GETALL_INQ_SUCCESS:
        state = {
          ...state,
          loading: false,
          inquiries: action.payload,
        };
        break;
      case inqConstants.GETALL_INQ_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case inqConstants.DELETE_INQ_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case inqConstants.DELETE_INQ_SUCCESS:
        state = {
          ...state,
          loading: false,
          inquiries: action.payload,
        };
        break;
      case inqConstants.DELETE_INQ_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case inqConstants.GETONE_INQ_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case inqConstants.GETONE_INQ_SUCCESS:
        state = {
          ...state,
          loading: false,
          inquiry: action.payload,
        };
        break;
      case inqConstants.GETONE_INQ_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case inqConstants.RESOLVE_INQ_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case inqConstants.RESOLVE_INQ_SUCCESS:
        state = {
          ...state,
          loading: false,
        };
        break;
      case inqConstants.RESOLVE_INQ_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
    }
    return state;
  };