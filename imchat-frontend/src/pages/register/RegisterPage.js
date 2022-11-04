import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from 'crypto-js';
import "./RegisterPage.scss";

function isValidPassword(str) {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (pattern.test(str)) return true;
    return false;
}

export default function Register() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
        public_key: Date.now()
    });


    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            // navigate("/");
        }
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value, public_key: Date.now() });
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, phone } = values;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
        return false;
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (!isValidPassword(password)) {
            toast.error(
                "Password should include uppercase (A, B, C), lowercase (a, b, c), numeric (1, 2, 3) and special (@, #, %) characters.",
                toastOptions
            );
            return false;
        } else if (phone === "") {
            toast.error("Phone number is required.", toastOptions);
            return false;
        }

        return true;
    };

    async function handleSubmit (event) {
        event.preventDefault();
        if (handleValidation()) {
            const { phone, username, password, public_key } = values;

            var ePassword = CryptoJS.SHA256(password);
            console.log(ePassword.toString(CryptoJS.enc.Hex));
            
            let data = await axios.post(registerRoute, {
                username,
                phone,
                password: ePassword.toString(CryptoJS.enc.Hex),
                public_key
            });     
            console.log(data);
            if (data.status !== 201) {
                console.log(11);
                toast.error("Status 201!", toastOptions);
            }
            if (data.status === 201) {
                setTimeout(function(){
                    navigate("/login");
                }, 6000);
                toast.success("User created! Redirectioning...", toastOptions);
                localStorage.setItem(
                process.env.REACT_APP_LOCALHOST_KEY,
                JSON.stringify(data.data.username)
                );
                
            }
        
        }
    };

    return (
        <div className="registration-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="card fat">
                                <div className="card-body">
                                    <div className="card-title-container">
                                    { <h4 className="card-title"></h4> }
                                    </div>
                                    <form className="my-registration-validation" action="" onSubmit={(event) => handleSubmit(event)}>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            onChange={(e) => handleChange(e)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                            className="form-control"
                                            type="tel"
                                            name="phone"
                                            pattern="[1-9]{1}[0-9]{8}" required
                                            onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            onChange={(e) => handleChange(e)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input
                                            className="form-control"
                                            type="password"
                                            name="confirmPassword"
                                            onChange={(e) => handleChange(e)}
                                            />
                                        </div>

                                        <div className="form-group-m-0">
                                            <button id="register-btn" type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}
