import { msgConstants } from "./constants";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";


export const AddNewMsg = (form) => {
    return async (dispatch) => {
      dispatch({ type: msgConstants.CREATE_MSG_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/inqMsg/createMessage", form);
  
        if (res.status === 201) {
          dispatch({
            type: msgConstants.CREATE_MSG_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Message Added..!", { id: "t8" });
        } else {
          dispatch({ type: msgConstants.CREATE_MSG_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
            dispatch({ type: msgConstants.CREATE_MSG_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: msgConstants.CREATE_MSG_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const deleteMsg = (form) => {
    return async (dispatch) => {
      dispatch({ type: msgConstants.DELETE_MSG_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/inqMsg/deleteMessage", form);  
        if (res.status === 200) {
          dispatch({
            type: msgConstants.DELETE_MSG_SUCCESS,
            payload: res.data.payload,
          });
          Swal.fire("Deleted!", "Message has been deleted.", "success");
        } else {
          dispatch({ type: msgConstants.DELETE_MSG_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
            dispatch({ type: msgConstants.DELETE_MSG_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: msgConstants.DELETE_MSG_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const getMsgById = (form) => {
    return async (dispatch) => {
      dispatch({ type: msgConstants.FETCH_MSG_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:8800/api/inqMsg/getAll", form);
        if (res.status === 200) {
          dispatch({
            type: msgConstants.FETCH_MSG_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: msgConstants.FETCH_MSG_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: msgConstants.FETCH_MSG_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: msgConstants.FETCH_MSG_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const updateMsg = (form) => {
    return async (dispatch) => {
      dispatch({ type: msgConstants.UPDATE_MSG_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:8800/api/inqMsg/updateMessage", form);
        if (res.status === 200) {
          dispatch({
            type: msgConstants.UPDATE_MSG_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Message Updated..!", { id: "t8" });
        } else {
          dispatch({ type: msgConstants.UPDATE_MSG_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
            dispatch({ type: msgConstants.UPDATE_MSG_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: msgConstants.UPDATE_MSG_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };