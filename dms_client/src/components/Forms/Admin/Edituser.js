import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edituser() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [authid, setAuthid] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const ids = { id: loc.state.id };
    fetch("http://localhost:4000/admin/getUserById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        setFirstName(result.userDetails.firstname);
        setLastName(result.userDetails.lastname);
        setContact(result.userDetails.contact);
        setEmail(result.authDetails.email);
        setAuthid(result.authDetails._id); // Store auth ID for update
      });
  }, [loc.state.id]);

  const updateUser = () => {
    const params = {
      id: loc.state.id,
      firstname: firstname,
      lastname: lastname,
      contact: contact,
      email: email,
      userstatus: 3,
      authid: authid // Pass auth ID for update
    };
    fetch("http://localhost:4000/admin/editAndUpdateUser", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("User updated successfully!", {
          position: toast.top_right,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user. Please try again.", {
          position: toast.top_right,
        });
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
                  <h3>Update User</h3>
                </div>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="firstNameInput"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="firstNameInput">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="lastNameInput"
                      placeholder="last Name"
                      value={lastname}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
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
                    onClick={updateUser}
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
      <ToastContainer />
    </>
  );
}

export default Edituser;
