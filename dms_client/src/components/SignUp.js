import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

   const registerUser =()=>{
    let params = {
        firstname:firstname,
        lastname:lastname,
        contact:contact,
        email:email,
        password:password,
        usertype: 3 
    }
    fetch("http://localhost:4000/auth/signup",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Accept:'applizcation/json'
    },
    body: JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        if (result === 'success') {
            setMessage('Registered successfully');
          } else {
            setMessage('Registration failed');
          }
        console.log(result);
   });
};

useEffect(() => {
    if (message === 'Registered successfully') {
      setTimeout(() => {
        navigate('/'); // Redirect to the home page after 2 seconds
      }, 2000);
    }
  }, [message, navigate]);



  return (
    <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                    <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" class="">
                                <h3 class="text-primary">DISASTER MANAGEMENT SYSTEM</h3>
                            </a>
                            <h3>REGISTER NOW!</h3>
                        </div>
                        {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
                        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingText" placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)} />
                            <label for="floatingText">First Name</label>
                        </div>

                        <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingText" placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)} />
                            <label for="floatingText">Last Name</label>
                        </div>

                        <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="floatingText" placeholder="Phone Number"
                        onChange={(e) => setContact(e.target.value)} />
                            <label for="floatingText">Contact</label>
                        </div>
                       
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)} />
                            <label for="floatingInput">Email address</label>
                        </div>

                        <div class="form-floating mb-4">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button type="butoon" class="btn btn-primary py-3 w-100 mb-4"
                        onClick={registerUser}
                        
                        >Sign Up</button>
                        <p class="text-center mb-0">Already have an Account? <a href="/">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Signup;