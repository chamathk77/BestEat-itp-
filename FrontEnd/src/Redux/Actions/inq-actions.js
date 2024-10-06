import { inqConstants } from "./constants";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";


export const fetchAllInq = () => {
    return async (dispatch) => {
      dispatch({ type: inqConstants.GETALL_INQ_REQUEST });
  
      try {
        const res = await axios.get("http://localhost:5005/api/inquiry/getAll");
  
        if (res.status === 200) {
          dispatch({
            type: inqConstants.GETALL_INQ_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: inqConstants.GETALL_INQ_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: inqConstants.GETALL_INQ_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: inqConstants.GETALL_INQ_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const deleteInq = (form) => {
    return async (dispatch) => {
      dispatch({ type: inqConstants.DELETE_INQ_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:5005/api/inquiry/deleteInquiry", form);
  
        if (res.status === 200) {
          dispatch({
            type: inqConstants.DELETE_INQ_SUCCESS,
            payload: res.data.payload,
          });
          Swal.fire("Deleted!", "Inquiry has been deleted.", "success");
        } else {
          dispatch({ type: inqConstants.DELETE_INQ_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
            dispatch({ type: inqConstants.DELETE_INQ_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: inqConstants.DELETE_INQ_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const getInquiryById = (form) => {
    return async (dispatch) => {
      dispatch({ type: inqConstants.GETONE_INQ_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:5005/api/inquiry/getById", form);
  
        if (res.status === 200) {
          dispatch({
            type: inqConstants.GETONE_INQ_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: inqConstants.GETONE_INQ_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: inqConstants.GETONE_INQ_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: inqConstants.GETONE_INQ_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

  export const resolveInq = (form) => {
    return async (dispatch) => {
      dispatch({ type: inqConstants.RESOLVE_INQ_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:5005/api/inquiry/resolveInq", form);
  
        if (res.status === 200) {
          dispatch({
            type: inqConstants.RESOLVE_INQ_SUCCESS
          });
          Swal.fire("Resolved!", "Inquiry has been resolved.", "success");
          window.location.href = "/inquiries"
        } else {
          dispatch({ type: inqConstants.RESOLVE_INQ_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            dispatch({ type: inqConstants.RESOLVE_INQ_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: inqConstants.RESOLVE_INQ_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };