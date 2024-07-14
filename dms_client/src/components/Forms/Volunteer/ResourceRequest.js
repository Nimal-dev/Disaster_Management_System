import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResourceRequest() {
  const [resourcerequest, setReqMessage] = useState('');
  const [message, setMessage] = useState('');
  const [auth] = useState(JSON.parse(localStorage.getItem('userdata')));

  const sendRequest = (event) => {
    event.preventDefault();
    if (!resourcerequest.trim()) {
      toast.error('Resource request cannot be empty.', {
        position: toast.top_right,
        autoClose: 2000,
      });
      return;
    }
    let params = {
      userid: auth._id,
      resourcerequest: resourcerequest,
    };
    fetch('http://localhost:4000/volunteer/sendresourceRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success('Resource request has been sent.', {
          position: toast.top_right,
          autoClose: 2000,
        });
        setReqMessage(''); // Clear input field after successful request
      })
      .catch((error) => {
        console.error('Error sending request:', error);
        toast.error('Failed to send request. Please try again later.', {
          position: toast.top_right,
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h3>REQUEST RESOURCE</h3>
              </div>
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Enter the resources you need"
                    id="floatingTextarea"
                    name="resourcerequest"
                    style={{ height: '150px' }}
                    value={resourcerequest}
                    onChange={(event) => setReqMessage(event.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Enter the Resources you Need</label>
                </div>

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
      <ToastContainer />
    </>
  );
}

export default ResourceRequest;
