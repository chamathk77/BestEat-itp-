import { driverConstants } from "../Actions/constants";

const initState = {
  drivers: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case driverConstants.CREATE_DRIVER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case driverConstants.CREATE_DRIVER_SUCCESS:
      state = {
        ...state,
        loading: false,
        drivers: action.payload,
      };
      break;
    case driverConstants.CREATE_DRIVER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case driverConstants.GETALL_DRIVERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case driverConstants.GETALL_DRIVERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        drivers: action.payload,
      };
      break;
    case driverConstants.GETALL_DRIVERS_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case driverConstants.DELETE_DRIVER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case driverConstants.DELETE_DRIVER_SUCCESS:
      state = {
        ...state,
        loading: false,
        drivers: action.payload,
      };
      break;
    case driverConstants.DELETE_DRIVER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case driverConstants.UPDATES_DRIVER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case driverConstants.UPDATES_DRIVER_SUCCESS:
      state = {
        ...state,
        loading: false,
        drivers: action.payload,
      };
      break;
    case driverConstants.UPDATES_DRIVER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
