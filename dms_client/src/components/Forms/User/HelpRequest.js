import React, { useState } from "react";

function HelpRequest() {
  const [helprequest, setHelpMessage] = useState("");
  const [message, setMessage] = useState("");
  const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));


  const sendHelp = (event) => {
    event.preventDefault();
    let params = {
      userid:auth._id,
      helprequest: helprequest,
    };
    fetch("http://localhost:4000/user/helpRequest", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Help request has been Sent");
      })
      .catch((error) => {
        console.error("Error sending Help:", error);
        // Show error message
        setMessage("Failed to send message. Please try again later!");
      });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          // style={{ minHeight: "50vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h3>REQUEST HELP</h3>
              </div>
              {/*------------------------- ALERT MESSAGE ---------------------------------*/}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form>
                {/*------------------------- Address Input ---------------------------------*/}
                <div className="form-floating mb-3">
                  <textarea
                    class="form-control"
                    placeholder="Enter State Committee Address"
                    id="floatingTextarea"
                    name="helprequest"
                    style={{ height: "150px" }}
                    onChange={(event) => setHelpMessage(event.target.value)}
                  ></textarea>
                  <label for="floatingTextarea">Help Message</label>
                </div>
                {/*------------------------- Email Input ---------------------------------*/}
                {/* 
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
                  </div> */}

                {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                <button
                  type="button"
                  className="btn btn-primary py-3 w-100 mb-4"
                  onClick={sendHelp}
                >
                  <strong>SEND HELP</strong>
                  {/* <i className="fa fa-plus"></i> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpRequest;
