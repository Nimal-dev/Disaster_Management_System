import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [name, setName] = useState("");
  const [usertype, setUsertype] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));

    if (userdata && userdata._id) {
      setUsertype(userdata.authid.usertype);
      if (userdata.authid.usertype === 1) {
        setName(userdata.statename); // Set the statename for state user
      } else if (userdata.authid.usertype === 2) {
        setName(userdata.volunteername);
      } else {
        setName(`${userdata.firstname} ${userdata.lastname}`); // Set the fullname for other users
      }
    }
  }, []);

  const getUsertypeLabel = () => {
    switch (usertype) {
      case 0:
        return "Admin";
      case 1:
        return "State";
      case 2:
        return "Volunteer";
      case 3:
        return "User";
      default:
        return "";
    }
  };

  const getUsertypeIcon = (usertype) => {
    switch (usertype) {
      case 0:
        return "fa-user-secret"; // Admin icon
      case 1:
        return "fa-building"; // State icon
      case 2:
        return "fa-hands-helping"; // Volunteer icon
      case 3:
        return "fa-user"; // User icon
      default:
        return "fa-user"; // Default icon
    }
  };

  const getDashboardLink = () => {
    switch (usertype) {
      case 0:
        return "/";
      case 1:
        return "/";
      case 2:
        return "/";
      case 3:
        return "/";
      default:
        return "/";
    }
  };

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">DMS</h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <i className={`fa ${getUsertypeIcon(usertype)} fa-2x me-2`}></i>
          <div className="ms-3">
            <h6 className="mb-0">{name}</h6>
            <span>{getUsertypeLabel()}</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          {usertype === 0 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>

              <NavLink
                exact
                to="/HelpRequests"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-bell me-2"></i>Help Requests
              </NavLink>

              <NavLink
                exact
                to="/ResourceRequests"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-bell me-2"></i>Resource Requests
              </NavLink>
            </>
          )}
          {usertype === 1 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>

              <NavLink
                exact
                to="/HelpRequests"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-bell me-2"></i>Help Requests
              </NavLink>

              <NavLink
                exact
                to="/ResourceRequests"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-bell me-2"></i>Resource Requests
              </NavLink>
            </>
          )}
          {usertype === 2 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>

              <NavLink
                exact
                to="/HelpRequests"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-bell me-2"></i>Help Requests
              </NavLink>
            </>
          )}
          {usertype === 3 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Home Page
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
