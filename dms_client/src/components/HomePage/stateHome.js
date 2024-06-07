import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import VolunteerList from "../Tables/VolunteerList";

function StateHome() {
  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <VolunteerList />
          </div>
        </div>
      </div>
    </>
  );
}

export default StateHome;
