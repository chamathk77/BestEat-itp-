import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
  MDBInputGroup,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { fetchAllInq } from "../../../Redux/Actions/inq-actions";
import ChatIcon from "@mui/icons-material/Chat";
import { getMsgById } from "../../../Redux/Actions/inq-msg-action";

const Feedbacks = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.inq.loading);
  const inquiries = useSelector((state) => state.inq.inquiries);
  const messages = useSelector((state) => state.msg.msg);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Inquiries | Best Eats";
  }, []);

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
    dispatch(fetchAllInq());
  }, [dispatch]);

  const search = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Search Functionality to filter inquiries based on the query
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.Inq_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.Customer_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.Inquiry_Subject.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      inquiry.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //add modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = (data) => {
    setShmodal(true);

    console.log(data.Inq_ID)
    dispatch(getMsgById({ Inq_ID: data.Inq_ID }));
  };

  const closeModal = () => {
    setShmodal(false);
  };

  const ShowModal = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog size="xl">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Chat History</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="table-container">
                  <MDBTable hover>
                    <MDBTableHead
                      style={{ backgroundColor: "#2e2e2e", color: "white" }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Message ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {messages.map((data, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{data.Msg_ID}</td>
                          <td>{data.Name}</td>
                          <td>{data.Message}</td>
                          <td>
                            {new Date(data.CreatedAt)
                              .toLocaleString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })
                              .replace(",", "")}
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button class="btn btn-outline-dark m-1" onClick={closeModal}>
                  Close
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <MDBTypography tag="div" className="display-6 pb-3 mb-3 border-bottom">
          INQUIRIES
        </MDBTypography>

        {/* Display total inquiries */}
        <MDBTypography tag="div" className="pb-3 mb-3">
          Total Inquiries: {inquiries.length}
        </MDBTypography>

        <div className="top-container">
          <div className="search">
            <MDBInputGroup>
              <MDBInput label="Search" value={searchQuery} onChange={search} />
              <MDBBtn rippleColor="dark">
                <MDBIcon icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>
        </div>

        <div className="table-container">
          <MDBTable hover>
            <MDBTableHead
              style={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <tr>
                <th scope="col">#</th>
                <th scope="col">Inquiry ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Inquiry Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {filteredInquiries.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.Inq_ID}</td>
                  <td>{data.Customer_Name}</td>
                  <td>{data.Inquiry_Subject}</td>
                  <td>{data.Status}</td>
                  <td>
                    {new Date(data.CreatedAt)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })
                      .replace(",", "")}
                  </td>

                  <td className="action-buttons">
                    <Tooltip title="View Inquiry">
                      <ChatIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "15px",
                        }}
                        onClick={() => showModal(data)}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      {ShowModal()}
    </>
  );
};

export default Feedbacks;
