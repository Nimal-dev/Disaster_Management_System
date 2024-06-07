import React from 'react'
import { Link } from "react-router-dom";

function UsersList() {
  return (
    <div class="col-12">
    <div class="bg-secondary rounded h-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">USERS LIST</h6>
              <Link className="btn btn-primary" to="/AddState">ADD USER</Link>
            </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>John</td>
                        <td>jhon@email.com</td>
                        <td>123</td>
                        <td>USA</td>
                        <td>
                        <button className='btn btn-success'>Edit</button> 
                        <button className='btn btn-danger ms-2'>Delete</button>
                    </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>mark@email.com</td>
                        <td>456</td>
                        <td>UK</td>
                        <td>
                        <button className='btn btn-success'>Edit</button> 
                        <button className='btn btn-danger ms-2'>Delete</button>
                    </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Jacob</td>
                        <td>jacob@email.com</td>
                        <td>789</td>
                        <td>AU</td>
                        <td>
                        <button className='btn btn-success'>Edit</button> 
                        <button className='btn btn-danger ms-2'>Delete</button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default UsersList