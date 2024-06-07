import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [usertype, setUsertype] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata && userdata._id) {
      setUsertype(userdata.authid.usertype);
      if (userdata.authid.usertype === 1) {
        setName(userdata.statename);
      } else if (userdata.authid.usertype === 2) {
        setName(userdata.volunteername);
      } else {
        setName(`${userdata.firstname} ${userdata.lastname}`);
      }
    }

    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/notifications");
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      const ids = unreadNotifications.map(n => n._id);

      if (ids.length > 0) {
        await fetch("http://localhost:4000/auth/notifications/mark-read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        });

        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top px-4 py-0 w-100">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </a>
      <form className="d-none d-md-flex ms-4">
        <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        {usertype !== null && [0, 1, 2].includes(usertype) && (
          <>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Notification</span>
                {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount}</span>}
              </a>
              <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0" onClick={markNotificationsRead}>
                {notifications.map((notification, index) => (
                  <a 
                    href="#" 
                    key={index} 
                    className="dropdown-item" 
                    onClick={() => navigate(notification.type === 'sos' ? '/SOSPage' : '/NotificationDetailsPage', { state: { notification } })}
                  >
                    {notification.message}
                  </a>
                ))}
                {/* <a href="#" className="dropdown-item text-center">See all notifications</a> */}
              </div>
            </div>
          </>
        )}
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
            <span className="d-none d-lg-inline-flex">{name}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">My Profile</a>
            <a href="#" className="dropdown-item">Settings</a>
            <a href="#" className="dropdown-item" onClick={handleLogout}>Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
