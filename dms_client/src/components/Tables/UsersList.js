import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersList() {
  const [users, setUser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewusers")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);
      });
  }, [refresh]);

  const deleteUser = (id) => {
    fetch("http://localhost:4000/admin/deleteUser", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1); // Trigger a refresh
        toast.success("User deleted successfully!", {
          position: toast.top_right,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.", {
          position: toast.top_right,
        });
      });
  };

  return (
    <>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-secondary rounded h-100 p-4">
          <div className="d-flex justify-content-between align-items-center mb-6">
            <h6 className="mb-0">USERS LIST</h6>
            <Link className="btn btn-primary" to="/AddUsers">
              ADD USERS
            </Link>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.authid.email}</td>
                  <td>{user.contact}</td>
                  <td>
                    <Link to="/Edituser" state={{ id: user._id }}>
                      <button className="btn btn-success">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UsersList;
