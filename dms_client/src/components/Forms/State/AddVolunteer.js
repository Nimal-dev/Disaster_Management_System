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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!volunteername) newErrors.volunteername = "Volunteer name is required";
    if (!contact) newErrors.contact = "Contact is required";
    else if (!/^\d+$/.test(contact)) newErrors.contact = "Contact must be a number";
    if (!location) newErrors.location = "Location is required";
    if (!address) newErrors.address = "Address is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveVolunteer = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return;

    let params = {
      volunteername,
      contact,
      location,
      address,
      email,
      password,
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
        // Clear errors
        setErrors({});
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
                  {/*------------------------- Volunteer Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="volunteerNameInput"
                      placeholder="Kerala Disaster management"
                      name="volunteername"
                      value={volunteername}
                      onChange={(event) => setVolunteername(event.target.value)}
                    />
                    <label htmlFor="volunteerNameInput">Volunteer Name</label>
                    {errors.volunteername && (
                      <div className="text-danger">{errors.volunteername}</div>
                    )}
                  </div>
                  {/*------------------------- Contact Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="contactInput"
                      placeholder="Contact"
                      name="contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                    />
                    <label htmlFor="contactInput">Contact</label>
                    {errors.contact && (
                      <div className="text-danger">{errors.contact}</div>
                    )}
                  </div>
                  {/*------------------------- Location Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="locationInput"
                      placeholder="Kollam"
                      name="location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    />
                    <label htmlFor="locationInput">Location</label>
                    {errors.location && (
                      <div className="text-danger">{errors.location}</div>
                    )}
                  </div>

                  {/*------------------------- Address Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Enter Volunteer Address"
                      id="floatingTextarea"
                      name="address"
                      style={{ height: "100px" }}
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Address</label>
                    {errors.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </div>
                  {/*------------------------- Email Input ---------------------------------*/}

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>

                  {/*------------------------- Password Input ---------------------------------*/}

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="passwordInput">Password</label>
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
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
