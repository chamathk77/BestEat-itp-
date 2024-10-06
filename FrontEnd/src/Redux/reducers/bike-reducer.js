import { bikeConstants } from "../Actions/constants";

const initState = {
  bikes: [],
  loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
      case bikeConstants.GET_AVAILABLE_BIKE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case bikeConstants.GET_AVAILABLE_BIKE_SUCCESS:
        state = {
          ...state,
          loading: false,
          bikes: action.payload,
        };
        break;
      case bikeConstants.GET_AVAILABLE_BIKE_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case bikeConstants.CREATE_BIKE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case bikeConstants.CREATE_BIKE_SUCCESS:
        state = {
          ...state,
          loading: false,
          bikes: action.payload,
        };
        break;
      case bikeConstants.CREATE_BIKE_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case bikeConstants.GETALL_BIKE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case bikeConstants.GETALL_BIKE_SUCCESS:
        state = {
          ...state,
          loading: false,
          bikes: action.payload,
        };
        break;
      case bikeConstants.GETALL_BIKE_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case bikeConstants.DELETE_BIKE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case bikeConstants.DELETE_BIKE_SUCCESS:
        state = {
          ...state,
          loading: false,
          bikes: action.payload,
        };
        break;
      case bikeConstants.DELETE_BIKE_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
      case bikeConstants.UPDATES_BIKE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case bikeConstants.UPDATES_BIKE_SUCCESS:
        state = {
          ...state,
          loading: false,
          bikes: action.payload,
        };
        break;
      case bikeConstants.UPDATES_BIKE_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;
    }
    return state;
  };