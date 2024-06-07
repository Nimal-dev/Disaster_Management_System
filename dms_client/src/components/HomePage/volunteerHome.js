import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import ResourceRequest from "../Forms/Volunteer/ResourceRequest";


function VolunteerHome() {
  return (
    <>
    <Sidebar />
    <div className="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <ResourceRequest/>,
          {/* <VolunteerList /> */}
        </div>
      </div>
    </div>
  </>
  )
}

export default VolunteerHome;