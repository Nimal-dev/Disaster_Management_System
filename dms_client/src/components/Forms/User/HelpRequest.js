import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HelpRequest() {
  const [helprequest, setHelpMessage] = useState("");
  const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));

  const sendHelp = (event) => {
    event.preventDefault();
    if (!helprequest.trim()) {
      toast.error("Help message cannot be empty.", {
        position: toast.top_centre,
        autoClose: 2000,
      });
      return;
    }
    let params = {
      userid: auth._id,
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
        toast.success("Help request has been sent.", {
          position: toast.top_right,
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error sending help request:", error);
        toast.error("Failed to send help request. Please try again later.", {
          position: toast.top_right,
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h3>REQUEST HELP</h3>
              </div>
              <form>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Enter your help request"
                    id="floatingTextarea"
                    name="helprequest"
                    style={{ height: "150px" }}
                    onChange={(event) => setHelpMessage(event.target.value)}
                    value={helprequest}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Help Message</label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary py-3 w-100 mb-4"
                  onClick={sendHelp}
                >
                  <strong>SEND HELP</strong>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default HelpRequest;
