import React,  { useState } from 'react'

function ResourceRequest() {
    const [resourcerequest, setReqMessage] = useState("");
    const [message, setMessage] = useState("");
    const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));
  
  
    const sendRequest = (event) => {
      event.preventDefault();
      let params = {
        userid:auth._id,
        resourcerequest: resourcerequest,
      };
      fetch("http://localhost:4000/volunteer/sendresourceRequest", {
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
          setMessage("Resource Request has been Sent");
        })
        .catch((error) => {
          console.error("Error sending Request:", error);
          // Show error message
          setMessage("Failed to send Request. Please try again later!");
        });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
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
                  <h3>REQUEST RESOURCE</h3>
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
                      onChange={(event) => setReqMessage(event.target.value)}
                    ></textarea>
                    <label for="floatingTextarea">Enter the Resources you Need</label>
                  </div>
  
                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={sendRequest}
                  >
                    <strong>SEND REQUEST</strong>
                    
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default ResourceRequest;