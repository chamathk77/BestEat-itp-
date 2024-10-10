import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
  MDBInputGroup,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchAllInq, deleteInq } from "../../../Redux/Actions/inq-actions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Chart from "react-apexcharts";

const Inquiries = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.inq.loading);
  const inquiries = useSelector((state) => state.inq.inquiries);

  // States to hold chart data
  const [monthlyData, setMonthlyData] = useState([]);
  const [statusData, setStatusData] = useState([]);

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

  const deleteInquiry = (data) => {
    const form = {
      inqId: data.Inq_ID,
    };
    Swal.fire({
      title: "Are you sure want to Delete this </br> Inquiry ?</br>",
      icon: "question",
      text: data.FullName,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteInq(form));
      }
    });
  };

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
    doc.text("Inquiries List", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add table data
    doc.autoTable({
      startY: 30,
      head: [
        ["Inquiry ID", "Customer Name", "Inquiry Subject", "Status", "Date"],
      ],
      body: filteredInquiries.map((data) => [
        data.Inq_ID,
        data.Customer_Name,
        data.Inquiry_Subject,
        data.Status,
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
    doc.save("Inquiries_Report.pdf");
  };

  //chart functions
  useEffect(() => {
    if (inquiries && inquiries.length > 0) {
      // Generate monthly data
      const months = Array(12).fill(0);
      inquiries.forEach((inquiry) => {
        const month = new Date(inquiry.CreatedAt).getMonth(); // Extract month index (0 - 11)
        months[month] += 1; // Increment count for the respective month
      });
      setMonthlyData(months);

      // Generate status data for the pie chart
      const statusCounts = inquiries.reduce(
        (acc, inquiry) => {
          if (inquiry.Status.toLowerCase() === "resolve") {
            acc[0] += 1;
          } else if (inquiry.Status.toLowerCase() === "pending") {
            acc[1] += 1;
          }
          return acc;
        },
        [0, 0]
      );

      setStatusData(statusCounts);
    }
  }, [inquiries]);

  // Monthly Chart Options
  const monthlyOptions = {
    chart: {
      id: "monthly-bar-chart",
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: function (value) {
          return Math.floor(value);
        },
      },
    },
    title: {
      text: "Inquiries Count per Month",
      align: "center",
    },
  };

  // Status Pie Chart Options
  const statusOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Resolved", "Pending"],
    title: {
      text: "Inquiry Status Distribution",
      align: "center",
    },
  };

  return (
    <>
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
          <div className="button-container">
            <div className="pdf-btn" onClick={downloadPdf}>
              <DescriptionIcon />
              Download Report
            </div>
          </div>
        </div>
        <div className="top-container">
          <div style={{ width: "45%" }}>
            <Chart
              options={monthlyOptions}
              series={[
                {
                  name: "Inquiries Count",
                  data: monthlyData,
                },
              ]}
              type="bar"
              height="400"
            />
          </div>
          <div style={{ width: "45%" }}>
            <Chart
              options={statusOptions}
              series={statusData}
              type="pie"
              height="400"
            />
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
                      <Link
                        to={`/inquiryChat/${data.Inq_ID}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <VisibilityIcon
                          style={{
                            cursor: "pointer",
                            marginRight: "15px",
                          }}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete Inquiry">
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          deleteInquiry(data);
                        }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
};

export default Inquiries;
