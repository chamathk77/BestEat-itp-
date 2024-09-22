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
  fetchDrivers,
  CreateDrivers,
  DeleteDriver,
  updateDriver,
} from "../../Actions/driver-action";
import { fetchAvailableBikes } from "../../Actions/bike-action";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

const Drivers = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.driver.loading);
  const drivers = useSelector((state) => state.driver.drivers);
  const bikes = useSelector((state) => state.bike.bikes);

  //custom hooks
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [nic, setNic] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState("");
  const [bikeId, setBikeId] = useState("");

  useEffect(() => {
    document.title = "Drivers | Best Eats";
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
    dispatch(fetchDrivers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAvailableBikes());
  }, [dispatch]);

  const deleteDriver = (data) => {
    const form = {
      driverId: data.Driver_ID,
    };
    Swal.fire({
      title: "Are you sure want to Delete this </br> Driver ?</br>",
      icon: "question",
      text: data.FullName,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(DeleteDriver(form));
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
    setName("");
    setEmail("");
    setMobileNo("");
    setNic("");
    setLicenseNumber("");
    setBikeId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name is required..!");
    } else if (email === "") {
      toast.error("Email is required..!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address..!");
    } else if (mobileNo === "") {
      toast.error("Mobile Number is required..!");
    } else if (!/^\d{10}$/.test(mobileNo)) {
      toast.error("Please enter a valid 10-digit mobile number..!");
    } else if (nic === "") {
      toast.error("NIC is required..!");
    } else if (licenseNumber === "") {
      toast.error("License is required..!");
    } else if (
      name !== "" &&
      email !== "" &&
      /\S+@\S+\.\S+/.test(email) &&
      mobileNo !== "" &&
      /^\d{10}$/.test(mobileNo) &&
      nic !== "" &&
      licenseNumber !== ""
    ) {
      const form = {
        name: name,
        email: email,
        mobile: mobileNo,
        nic: nic,
        license: licenseNumber,
        bikeID: bikeId,
      };

      dispatch(CreateDrivers(form));
      closeModal();
    }
  };

  const AddDriverModel = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Driver</MDBModalTitle>
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
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          required
                          value={mobileNo}
                          onChange={(e) => setMobileNo(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="NIC"
                          variant="outlined"
                          fullWidth
                          required
                          value={nic}
                          onChange={(e) => setNic(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="License Number"
                          variant="outlined"
                          fullWidth
                          required
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          select
                          label="Select Bike"
                          variant="outlined"
                          fullWidth
                          value={bikeId}
                          onChange={(e) => setBikeId(e.target.value)}
                        >
                          {bikes.map((data, index) => (
                            <MenuItem value={data.LicensePlate} key={index}>
                              {data.LicensePlate}
                            </MenuItem>
                          ))}
                        </TextField>
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
    setDriverId(data.Driver_ID);
    setName(data.Name);
    setEmail(data.Email);
    setMobileNo(data.MobileNo);
    setNic(data.NIC);
    setLicenseNumber(data.LicenseNumber);
    setStatus(data.Status);
    setBikeId(data.BikeID);
  };

  const closeUpModal = () => {
    setShupmodal(false);
    setDriverId("");
    setName("");
    setEmail("");
    setMobileNo("");
    setNic("");
    setLicenseNumber("");
    setStatus("");
    setBikeId("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address..!");
      return;
    }

    if (!mobileRegex.test(mobileNo)) {
      toast.error("Please enter a valid 10-digit mobile number..!");
      return;
    }
    const form = {
      driverId: driverId,
      name: name,
      email: email,
      mobile: mobileNo,
      nic: nic,
      license: licenseNumber,
      status: status,
      BikeID: bikeId,
    };

    dispatch(updateDriver(form));
    closeUpModal();
  };

  const UpdateDriverModel = () => {
    return (
      <div>
        <MDBModal open={shupmodal} setOpen={setShupmodal} tabIndex="-1">
          <MDBModalDialog size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Update Driver</MDBModalTitle>
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
                          label="Driver ID"
                          variant="outlined"
                          fullWidth
                          disabled
                          value={driverId}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          required
                          value={mobileNo}
                          onChange={(e) => setMobileNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="NIC"
                          variant="outlined"
                          fullWidth
                          required
                          value={nic}
                          onChange={(e) => setNic(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          type="text"
                          label="License Number"
                          variant="outlined"
                          fullWidth
                          required
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
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
                          required
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="On Delivery">On Delivery</MenuItem>
                          <MenuItem value="Off Duty">Off Duty</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </TextField>
                      </div>
                      <div className="col-md-6 form-group">
                        <TextField
                          select
                          label="Select Bike"
                          variant="outlined"
                          fullWidth
                          value={bikeId}
                          onChange={(e) => setBikeId(e.target.value)}
                        >
                          {bikes.map((data, index) => (
                            <MenuItem value={data.LicensePlate} key={index}>
                              {data.LicensePlate}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={closeUpModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleUpdate}>Update Driver</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  return (
    <>
      <div className="main-container">
        <MDBTypography tag="div" className="display-6 pb-3 mb-3 border-bottom">
          Drivers List
        </MDBTypography>

        <div className="top-container">
          <div className="search">
            <MDBInputGroup>
              <MDBInput label="Search" />
              <MDBBtn rippleColor="dark">
                <MDBIcon icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>
          <div className="button-container">
            <div className="pdf-btn">
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
              Add New Driver
            </div>
          </div>
        </div>
        <div className="table-container">
          <MDBTable hover>
            <MDBTableHead
              style={{ backgroundColor: "#2e2e2e", color: "white" }}
            >
              <tr>
                <th scope="col">#</th>
                <th scope="col">Driver ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No</th>
                <th scope="col">NIC</th>
                <th scope="col">License</th>
                <th scope="col">Status</th>
                <th scope="col">Bike ID</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {drivers.map((data, index) => (
                <tr
                  key={index}
                  style={{ height: "50px", verticalAlign: "middle" }}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{data.Driver_ID}</td>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>{data.MobileNo}</td>
                  <td>{data.NIC}</td>
                  <td>{data.LicenseNumber}</td>
                  <td>{data.Status}</td>
                  <td>{data.BikeID}</td>
                  <td className="action-buttons">
                    <Tooltip title="Upgrade Driver">
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
                    <Tooltip title="Delete Driver">
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          deleteDriver(data);
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
      {AddDriverModel()}
      {UpdateDriverModel()}
    </>
  );
};

export default Drivers;
