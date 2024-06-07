import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";

function EditVolunteer() {
  const [volunteername, setVolunteername] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [authid, setAuthid] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();


  useEffect(() => {
    const ids = { id: loc.state.id };
  
    fetch("http://localhost:4000/admin/updateVolunteerById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result,"niji");
        setVolunteername(result.volunteerDetails.volunteername);
        setLocation(result.volunteerDetails.location);
        setContact(result.volunteerDetails.contact);
        setAddress(result.volunteerDetails.address);
        setEmail(result.authDetails.email);
        setAuthid(result.authDetails._id); // Store auth ID for update
      });
  }, []);

  const updateVolunteer = () => {
    const params = {
      id: loc.state.id,
      volunteername: volunteername,
      contact: contact,
      location: location,
      address: address,
      email: email,
      userstatus: 2,
      authid: authid // Pass auth ID for update
    };
    fetch("http://localhost:4000/admin/editAndUpdateVolunteer", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/StateHome");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Update Volunteer</h3>
                </div>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="volunteerNameInput"
                      placeholder="Kerala Disaster management"
                      value={volunteername}
                      onChange={(event) => setVolunteername(event.target.value)}
                    />
                    <label htmlFor="volunteerNameInput">Volunteer</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="contactInput"
                      placeholder="Contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                    />
                    <label htmlFor="contactInput">Contact</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="locationInput"
                      placeholder="Location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    />
                    <label htmlFor="locationInput">Location</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    <label htmlFor="addressInput">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={updateVolunteer}
                  >
                    <strong>UPDATE</strong>{" "}
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVolunteer;
