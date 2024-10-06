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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { TextField, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewBikes,
  fetchAllBikes,
  deleteBikes,
  updateBike,
} from "../../../Redux/Actions/bike-action";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import jsPDF from "jspdf";
import "jspdf-autotable";


const Vehicles = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bike.loading);
  const bikes = useSelector((state) => state.bike.bikes);

  // Search state
  const [serQuary, setSerQuary] = useState("");

  //custom hooks
  const [bikeID, setBikeID] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [kilometers, setKilometers] = useState(0);

  useEffect(() => {
    document.title = "Vehicles | Best Eats";
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
    dispatch(fetchAllBikes());
  }, [dispatch]);

  const removeBike = (data) => {
    const form = {
      BikeID: data.BikeID,
    };
    Swal.fire({
      title: "Are you sure want to Delete this </br> Vehicle ?</br>",
      icon: "question",
      text: data.FullName,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteBikes(form));
      }
    });
  };

  //add new driver modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = () => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
    setBrand("")
    setKilometers("")
    setLastServiceDate("")
    setLicensePlate("")
    setModel("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (licensePlate === "") {
      toast.error("License Plate is required..!");
    } else if (brand === "") {
      toast.error("Brand is required..!");
    } else if (model === "") {
      toast.error("Model is required..!");
    } else if (lastServiceDate === "") {
      toast.error("Last Service Date is required..!");
    } else if (kilometers === 0) {
      toast.error("Kilometers is required..!");
    } else if (
      licensePlate !== "" &&
      brand !== "" &&
      model !== "" &&
      lastServiceDate !== "" &&
      kilometers !== 0
    ) {
      const form = {
        bikeID: bikeID,
        LicensePlate: licensePlate,
        Brand: brand,
        Model: model,
        LastServiceDate: lastServiceDate,
        Kilometers: kilometers,
      };

      dispatch(addNewBikes(form));
      closeModal();
    }
  };

  const AddBikeModel = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Vehicle</MDBModalTitle>
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
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="License Plate"
                          variant="outlined"
                          fullWidth
                          required
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Brand"
                          variant="outlined"
                          fullWidth
                          required
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Model"
                          variant="outlined"
                          fullWidth
                          required
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="date"
                          label="Last Service Date"
                          variant="outlined"
                          fullWidth
                          required
                          InputLabelProps={{ shrink: true }}
                          value={lastServiceDate}
                          onChange={(e) => setLastServiceDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="number"
                          label="Kilometers"
                          variant="outlined"
                          fullWidth
                          required
                          value={kilometers}
                          onChange={(e) => setKilometers(e.target.value)}
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

  //add new driver modal functions
  const [shupmodal, setShupmodal] = useState(false);

  const showUpModal = (data) => {
    setShupmodal(true);
    setBikeID(data.BikeID);
    setLicensePlate(data.LicensePlate);
    setBrand(data.Brand);
    setModel(data.Model);
    setStatus(data.Status);
    setLastServiceDate(data.LastServiceDate);
    setKilometers(data.Kilometers);
  };

  const closeUpModal = () => {
    setShupmodal(false);
    setBikeID("");
    setLicensePlate("");
    setBrand("");
    setModel("");
    setStatus("");
    setLastServiceDate("");
    setKilometers(0);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = {
      BikeID: bikeID,
      Status: status,
      LastServiceDate: lastServiceDate,
      Kilometers: kilometers,
    };

    dispatch(updateBike(form));
    closeUpModal();
  };

  const UpdateBikeModel = () => {
    return (
      <div>
        <MDBModal open={shupmodal} setOpen={setShupmodal} tabIndex="-1">
          <MDBModalDialog size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Update Vehicle</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeUpModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Bike ID"
                          variant="outlined"
                          fullWidth
                          value={bikeID}
                          disabled
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="License Plate"
                          variant="outlined"
                          fullWidth
                          value={licensePlate}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Brand"
                          variant="outlined"
                          fullWidth
                          value={brand}
                          disabled
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Model"
                          variant="outlined"
                          fullWidth
                          value={model}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          select
                          label="Status"
                          variant="outlined"
                          fullWidth
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="Not Allocated">
                            Not Allocated
                          </MenuItem>
                          <MenuItem value="Allocated">Allocated</MenuItem>
                          <MenuItem value="Under Maintanence">
                            Under Maintanence
                          </MenuItem>
                        </TextField>
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="date"
                          label="Last Service Date"
                          variant="outlined"
                          fullWidth
                          required
                          InputLabelProps={{ shrink: true }}
                          value={lastServiceDate}
                          onChange={(e) => setLastServiceDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="number"
                          label="Kilometers"
                          variant="outlined"
                          fullWidth
                          required
                          value={kilometers}
                          onChange={(e) => setKilometers(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={closeUpModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleUpdate}>Update Vehicle</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  /*search function */

  const search = (event) => {
    setSerQuary(event.target.value.toLowerCase());
  };

  // Search functionality to filter vehicles
  const filteredBikes = bikes.filter(
    (bike) =>
      bike.LicensePlate.toLowerCase().includes(serQuary.toLowerCase()) ||
      bike.Brand.toLowerCase().includes(serQuary.toLowerCase()) ||
      bike.Model.toLowerCase().includes(serQuary.toLowerCase()) ||
      bike.Status.toLowerCase().includes(serQuary.toLowerCase())
  );

  // Function to download the filtered vehicle table as a PDF with a watermark
  const downloadPdf = () => {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    var formattedDate = curr_month + "/" + curr_date + "/" + curr_year;
    const doc = new jsPDF();

    // Add date on the left corner
    doc.setFontSize(9);
    doc.text(formattedDate, 15, 5);

    // Add "BestEats" name on the right corner
    doc.setFontSize(9);
    doc.text("BestEats", 175, 5, { align: "right" });

    // Add title
    doc.setFontSize(16);
    doc.text("Vehicles List", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add table data
    doc.autoTable({
      startY: 30,
      head: [
        [
          "Bike ID",
          "License Plate",
          "Brand",
          "Model",
          "Status",
          "Last Service Date",
          "Kilometers",
        ],
      ],
      body: filteredBikes.map((bike) => [
        bike.BikeID,
        bike.LicensePlate,
        bike.Brand,
        bike.Model,
        bike.Status,
        bike.LastServiceDate,
        bike.Kilometers,
      ]),
    });

    // Save the PDF
    doc.save("Vehicles_Report.pdf");
  };

  return (
    <>
      <div className="main-container">
        <MDBTypography tag="div" className="display-6 pb-3 mb-3 border-bottom">
          Vehicle List
        </MDBTypography>

        <div className="top-container">
          <div className="search">
            <MDBInputGroup>
              <MDBInput label="Search"value={serQuary} onChange={search} />
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
            <div
              className="add-btn"
              onClick={(e) => {
                showModal();
              }}
            >
              <AddIcon />
              Add New Vehicle
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h6>Total Vehicles: {bikes.length}</h6>
        </div>
        <div className="table-container">
          <MDBTable hover>
            <MDBTableHead
              style={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <tr>
                <th scope="col">#</th>
                <th scope="col">Bike ID</th>
                <th scope="col">License Plate</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Status</th>
                <th scope="col">Last Service Date</th>
                <th scope="col">Kilometers</th>

                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {filteredBikes.map((data, index) => (
                <tr
                  key={index}
                  style={{ height: "50px", verticalAlign: "middle" }}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{data.BikeID}</td>
                  <td>{data.LicensePlate}</td>
                  <td>{data.Brand}</td>
                  <td>{data.Model}</td>
                  <td>{data.Status}</td>
                  <td>{data.LastServiceDate}</td>
                  <td>{data.Kilometers}</td>

                  <td className="action-buttons">
                    <Tooltip title="Upgrade Vehicle">
                      <SettingsIcon
                        style={{
                          cursor: "pointer",
                          marginRight: "15px",
                        }}
                        onClick={(e) => {
                          showUpModal(data);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Vehicle">
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          removeBike(data);
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
      {AddBikeModel()}
      {UpdateBikeModel()}
    </>
  );
};

export default Vehicles;
