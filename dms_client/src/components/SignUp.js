import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!firstname.trim()) {
            newErrors.firstname = 'First name is required';
        } else if (!/^[a-zA-Z]+$/.test(firstname)) {
            newErrors.firstname = 'First name should only contain letters';
        }

        if (!lastname.trim()) {
            newErrors.lastname = 'Last name is required';
        } else if (!/^[a-zA-Z]+$/.test(lastname)) {
            newErrors.lastname = 'Last name should only contain letters';
        }

        if (!contact.trim()) {
            newErrors.contact = 'Contact number is required';
        } else if (!/^\d{10}$/.test(contact)) {
            newErrors.contact = 'Contact number should be exactly 10 digits';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@gmail\.com$/.test(email)) {
            newErrors.email = 'Email should be a valid gmail address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character';
        }

        return newErrors;
    };

    const registerUser = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let params = {
            firstname,
            lastname,
            contact,
            email,
            password,
            usertype: 3
        };

        fetch("http://localhost:4000/auth/signup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
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
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                    <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="/" className="">
                                <h3 className="text-primary">DISASTER MANAGEMENT SYSTEM</h3>
                            </a>
                            <h3>REGISTER NOW!</h3>
                        </div>
                        {message && <div className="alert alert-info">{message}</div>}
                        
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingText" placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)} />
                            <label htmlFor="floatingText">First Name</label>
                            {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingText" placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)} />
                            <label htmlFor="floatingText">Last Name</label>
                            {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingText" placeholder="Phone Number"
                                onChange={(e) => setContact(e.target.value)} />
                            <label htmlFor="floatingText">Contact</label>
                            {errors.contact && <div className="text-danger">{errors.contact}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className="form-floating mb-4">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <button type="button" className="btn btn-primary py-3 w-100 mb-4"
                            onClick={registerUser}>
                            Sign Up
                        </button>
                        <p className="text-center mb-0">Already have an Account? <a href="/">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
