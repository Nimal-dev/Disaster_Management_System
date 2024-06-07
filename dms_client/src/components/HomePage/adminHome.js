import React, { useEffect, useState } from 'react'
import Widgets from '../common/Widgets';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import StateList from '../Tables/StateList';
import VolunteerList from '../Tables/VolunteerList';
import UsersList from '../Tables/UsersList';

function AdminHome() {
    const [usertype, setUsertype] = useState(null);

    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      if (userdata && userdata.userid) {
        setUsertype(userdata.usertype); // Set the usertype from userdata
      }
    }, []);
    return (
    <>
    <Sidebar/>
    <div class="content">
    <Navbar/>
    <Widgets/>
    {/* {usertype === 0 ? <Widgets /> : null} Conditionally render Widgets based on usertype  */}
    <div class="container-fluid pt-4 px-4">
    <div class="row g-4">
        <StateList/>
        <VolunteerList/>
        <UsersList/>
    </div>
    </div>
    </div>
    </>
      
    )
}

export default AdminHome;