import React, { useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
function ResourceRequestList() {
    const [resourceRequest, setResourceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    //   fetch("http://localhost:4000/user/helpRequests")
      fetch("http://localhost:4000/volunteer/getresourceRequest")
        .then((res) => res.json())
        .then((data) => {
          const sortedRequests = data.sort((a, b) => new Date(b.resourcerequestdate) - new Date(a.resourcerequestdate));
          setResourceRequests(sortedRequests);
          setLoading(false);
          console.log(sortedRequests)
        })
        .catch((error) => {
          console.error("Error fetching help requests:", error);
          setLoading(false);
        });
    }, []);
  
    return (
      <>
        <Sidebar />
        <div className="content">
          <Navbar />
          <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center">
              <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                  <h3 className="text-center">Resource Requests</h3>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="list-group">
                      {resourceRequest.length > 0 ? (
                        resourceRequest.map((request, index) => (
                          <div 
                            key={request._id} 
                            className="d-flex align-items-center border-bottom py-3"
                            style={{ 
                              color: '#6C7293' // Ensuring text color is readable
                            }}
                          >
                           
                            <div className="w-100 ms-3">
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-0">{request.userid.volunteername}</h5>
                                <small>{new Date(request.resourcerequestdate).toLocaleString()}</small>
                              </div>
                             <span>🚨{request.resourcerequest}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Requests found.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }


export default ResourceRequestList