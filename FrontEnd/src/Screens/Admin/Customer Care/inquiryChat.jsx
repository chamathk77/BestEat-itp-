import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { TextField, MenuItem } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { getInquiryById, resolveInq } from "../../../Redux/Actions/inq-actions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  AddNewMsg,
  getMsgById,
  deleteMsg,
  updateMsg,
} from "../../../Redux/Actions/inq-msg-action";

const InquiryChat = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.inq.loading);
  const loading2 = useSelector((state) => state.msg.loading);
  const inquiry = useSelector((state) => state.inq.inquiry);
  const messages = useSelector((state) => state.msg.msg);

  const { inq_ID } = useParams();

  // this is tempory one name
  const tempName = "Dashitha";

  useEffect(() => {
    document.title = "Support Desk | Best Eats";
  }, []);

  //custome hooks
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgID, setMsgID] = useState("");

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);
  useEffect(() => {
    if (loading2 === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading2 === false) {
      toast.dismiss("loading");
    }
  }, [loading2]);

  const form = {
    InqID: inq_ID,
  };
  const form2 = {
    Inq_ID: inq_ID,
  };

  useEffect(() => {
    dispatch(getInquiryById(form));
  }, [dispatch, inq_ID]);

  useEffect(() => {
    dispatch(getMsgById(form2));
  }, [dispatch, inq_ID]);

  const deleteMessage = (data) => {
    const form = {
      Msg_ID: data.Msg_ID,
      Inq_ID: inq_ID,
    };
    Swal.fire({
      title: "Are you sure want to Delete this </br> Message ?</br>",
      icon: "question",
      text: data.FullName,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteMsg(form));
      }
    });
  };

  // Function to download the filtered inquiries as a PDF with a watermark
  const downloadPdf = () => {
    const doc = new jsPDF();
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();
    var formattedDate = curr_month + "/" + curr_date + "/" + curr_year;

    // Add header with date and name of the app
    doc.setFontSize(9);
    doc.text(formattedDate, 15, 5);
    doc.setFontSize(9);
    doc.text("Best Eats", 175, 5, { align: "right" });

    // Add title
    doc.setFontSize(16);
    doc.text(
      "Inquiries Chat Customer Wise ",
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    // Add table data
    doc.autoTable({
      startY: 30,
      head: [
        [
          "Message ID",
          "Inquiry ID",
          "Customer Name",
          "Inquiry Message",
          "Created Date",
        ],
      ],
      body: messages.map((data) => [
        data.Msg_ID,
        data.Inq_ID,
        data.Name,
        data.Message,
        new Date(data.CreatedAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      ]),
    });

    // Save the PDF
    doc.save("Inquiries_Chat_Report.pdf");
  };

  // //close ticket
  const closeTicket = (data) => {
    const form = {
      Inq_ID: data.Inq_ID,
    };
    Swal.fire({
      title: "Are you sure want to Resolve this </br> Inquiry ?</br>",
      icon: "question",
      text: data.FullName,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(resolveInq(form));
      }
    });
  };

  //add new note modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = () => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
    setName("");
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name == "") {
      toast.error("Name is required..!", { id: "d4" });
    } else if (msg == "") {
      toast.error("Message is required..!", { id: "d5" });
    } else if (name !== "" && msg !== "") {
      const form = {
        Inq_ID: inq_ID,
        Name: name,
        Message: msg,
      };
      dispatch(AddNewMsg(form));
      closeModal();
    }
  };

  const AddNote = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Note</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
                    <div className="row mb-4">
                      <div className="col-md-12 form-group">
                        <TextField
                          type="text"
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-12 form-group">
                        <TextField
                          type="text"
                          label="Body"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={6}
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={closeModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  //update modal functions
  const [shupmodal, setShupmodal] = useState(false);

  const showupModal = (data) => {
    setShupmodal(true);
    setName(data.Name);
    setMsg(data.Message);
    setMsgID(data.Msg_ID);
  };

  const closeupModal = () => {
    setShupmodal(false);
    setName("");
    setMsg("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (name == "") {
      toast.error("Name is required..!", { id: "d4" });
    } else if (msg == "") {
      toast.error("Message is required..!", { id: "d5" });
    } else if (name !== "" && msg !== "") {
      const form = {
        Inq_ID: inq_ID,
        Msg_ID: msgID,
        Name: name,
        message: msg,
      };
      dispatch(updateMsg(form));
      closeupModal();
    }
  };

  const UpdateNote = () => {
    return (
      <div>
        <MDBModal open={shupmodal} setOpen={setShupmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Update Note</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeupModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
                    <div className="row mb-4">
                      <div className="col-md-12 form-group">
                        <TextField
                          type="text"
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-12 form-group">
                        <TextField
                          type="text"
                          label="Body"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={6}
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={closeupModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleUpdate}>Submit</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  return (
    <>
      {inquiry && inquiry.length > 0 ? (
        <div className="main-container">
          <MDBTypography
            tag="div"
            className="display-6 pb-3 mb-3 border-bottom"
          >
            Support Desk
          </MDBTypography>

          <div className="top-container">
            <div className="button-container">
              <a href="/inquiries">
                <div className="bk-btn">
                  <ArrowBackIcon style={{ marginRight: "10px" }} />
                  Back
                </div>
              </a>
              <div className="pdf-btn">
                <div className="pdf-btn" onClick={downloadPdf}>
                  <DescriptionIcon />
                  Download Report
                </div>
              </div>
            </div>
          </div>

          <div className="heading-container">
            <div className="left-container">
              <p style={{ fontSize: "28px", fontWeight: "700" }}>
                INQUIRY ID : {inquiry[0].Inq_ID}
              </p>
              <p style={{ fontSize: "22px", fontWeight: "500" }}>
                DATE SUBMITTED :
                {new Date(inquiry[0].CreatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>

              <p style={{ fontSize: "22px", fontWeight: "500" }}>
                INQUIRY SUBJECT : {inquiry[0].Inquiry_Subject}
              </p>
            </div>
            <div className="right-container">
              <p style={{ fontSize: "24px", fontWeight: "700" }}>
                {inquiry[0].Status}
              </p>
            </div>
          </div>

          <div className="inquiry-body">
            <p style={{ fontSize: "22px", fontWeight: "600" }}>
              INQUIRY DESCRIPTION
            </p>
            <p>{inquiry[0].Inquiry_Description}</p>
            <p style={{ marginTop: "20px", fontWeight: "700" }}>
              Name - {inquiry[0].Customer_Name}
            </p>
          </div>

          <div className="note-container">
            <p style={{ fontSize: "26px", fontWeight: "700" }}>Notes</p>
            <div className="note-btn" onClick={(e) => showModal()}>
              <AddIcon style={{ marginRight: "10px" }} />
              Add Note
            </div>
          </div>

          {messages.map((data, index) => (
            <div className="msg-container" key={index}>
              <div className="msg-left">
                <p style={{ fontSize: "21px", fontWeight: "700" }}>
                  {data.Name}
                </p>
                <p>{data.Message}</p>
              </div>
              <div className="msg-right">
                <div className="date-section">
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {new Date(data.CreatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                {data.Name === tempName && (
                  <div className="btn-section">
                    <Tooltip title="Upgrade Message">
                      <SettingsIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "15px",
                        }}
                        onClick={(e) => {
                          showupModal(data);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Message">
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          deleteMessage(data);
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="close-section">
            <div className="close-btn" onClick={(e) => closeTicket(inquiry[0])}>
              <CancelIcon style={{ marginRight: "15px" }} />
              Close Inquiry {inquiry[0].Inq_ID}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Loading...</h1>
        </div>
      )}
      {AddNote()}
      {UpdateNote()}
    </>
  );
};

export default InquiryChat;
