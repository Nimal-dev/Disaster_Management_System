import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddVolunteer() {
  const [volunteername, setVolunteername] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const saveVolunteer = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    let params = {
      volunteername: volunteername,
      contact: contact,
      location: location,
      address: address,
      email: email,
      password: password,
      usertype: 2,
    };
    fetch("http://localhost:4000/admin/AddVolunteer", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Volunteer added successfully.");
        // Clear form fields after successful submission
        setVolunteername("");
        setContact("");
        setLocation("");
        setAddress("");
        setEmail("");
        setPassword("");
        // setError("");
      })
      .catch((error) => {
        console.error("Error adding Volunteer:", error);
        // Show error message
        setMessage("Failed to add Volunteer. Please try again.");
      });
    setTimeout(() => {
      navigate('/StateHome');
    }, 2000);
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
                  <h3>Add Volunteer</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form>
                  {/*------------------------- State Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="volunteerNameInput"
                      placeholder="Kerala Disaster management"
                      name="volunteername"
                      onChange={(event) => setVolunteername(event.target.value)}
                    />
                    <label htmlFor="volunteerNameInput">Volunteer Name</label>
                  </div>
                  {/*------------------------- Contact Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      placeholder="Contact"
                      name="contact"
                      onChange={(event) => setContact(event.target.value)}
                    />
                    <label htmlFor="addressInput">Contact</label>
                  </div>
                  {/*------------------------- Loaction Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="locationInput"
                      placeholder="Kollam"
                      name="location"
                      onChange={(event) => setLocation(event.target.value)}
                    />
                    <label htmlFor="locationInput">Location</label>
                  </div>

                  {/*------------------------- Address Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <textarea
                      class="form-control"
                      placeholder="Enter Volunteer Address"
                      id="floatingTextarea"
                      name="address"
                      style={{height: "100px"}}
                      onChange={(event) => setAddress(event.target.value)}
                    ></textarea>
                    <label for="floatingTextarea">Address</label>
                    
                  </div>
                  {/*------------------------- Email Input ---------------------------------*/}

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                  </div>

                  {/*------------------------- Password Input ---------------------------------*/}

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      placeholder="Password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="passwordInput">Password</label>
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={saveVolunteer}
                  >
                    <strong>CREATE</strong>
                    <i className="fa fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddVolunteer;
