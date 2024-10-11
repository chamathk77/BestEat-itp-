import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Set_Update_Employee } from "../../../Redux/reducers/Employee";
import { useDispatch } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Employee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8800/employee/display")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/delete/employee/" + id);
      setEmployee(employee.filter((emp) => emp.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Employee Report", 14, 10);
    doc.autoTable({
      head: [["ID", "Name", "Address", "Phone Number", "Week Start Date", "Start Time", "End Time"]],
      body: employee.map((data) => [
        data.id,
        data.Name,
        data.Address,
        data.Phoneno,
        new Date(data.week_start_date).toLocaleDateString(),
        data.start_time,
        data.end_time,
      ]),
      startY: 20,
    });
    doc.save("employee_report.pdf");
  };

  // Filter employees by the search term
  const filteredEmployees = employee.filter((emp) =>
    emp.id.toString().includes(searchTerm)
  );

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 p-4 rounded shadow-lg" style={{ backgroundColor: "white" }}>
        {/* Header with buttons */}
        <div className="d-flex justify-content-between mb-4">
          <div>
            <Link to="/employee/create" className="btn" style={{ backgroundColor: "orange", color: "white" }}>
              Add +
            </Link>
            <Link to="/employee/Schedule" className="btn ms-2" style={{ backgroundColor: "orange", color: "white" }}>
              SHOW SCHEDULE
            </Link>
            <button
              onClick={generatePDF}
              className="btn ms-2"
              style={{ backgroundColor: "orange", color: "white" }}
            >
              Generate PDF Report
            </button>
          </div>
          <div className="bg-light p-3 rounded shadow-sm">
            <h4>Total Employees: {employee.length}</h4>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Employee ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "20px", padding: "10px" }} // Modern style
          />
        </div>

        {/* Scrollable Table Container */}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "orange", color: "white" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((data, i) => (
                <tr key={i}>
                  <td>{data["id"]}</td>
                  <td>{data["Name"]}</td>
                  <td>{data["Address"]}</td>
                  <td>{data["Phoneno"]}</td>
                  <td>{data["Email"]}</td>
                  <td className="action-column d-flex" style={{ gap: "10px" }}>
                    <button
                      onClick={() => {
                        navigate(`/employee/update/${data.id}`);
                        dispatch(Set_Update_Employee({
                          id: data.id,
                          name: data.Name,
                          email: data.Email,
                          address: data.Address,
                          phoneno: data.Phoneno,
                        }));
                      }}
                      className="btn"
                      style={{ backgroundColor: "orange", color: "white" }}
                    >
                      UPDATE
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(data.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;
