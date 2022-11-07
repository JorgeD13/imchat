import {useEffect, useState} from "react";
import axios from "axios";
import { authenticate, authFailure, authSuccess } from '../../redux/authActions';
import { userLogin } from '../../api/authenticationService';
import {Alert,Spinner} from 'react-bootstrap';
import { codeRoute, loginRoute } from "../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from 'crypto-js';
import './LoginPage.scss';
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    let navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [flag, setFlag] = useState(1);
    const [code, setCode] = useState(0);
    const [phone, setPhone] = useState(0);

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    // useEffect = () =>{
    //     setValues(
    //         {
    //             username: '',
    //             password: ''
    //         }
    //     );
    // }

    async function handleSubmit (evt) {
        evt.preventDefault();
        // props.authenticate();

        console.log("LOCAL STORE: ", localStorage);

        const {username, password} = values;
        console.log(values);
        var ePassword = CryptoJS.SHA256(password);
        let data = await axios.post(loginRoute, {
            username,
            password: ePassword.toString(CryptoJS.enc.Hex)
        });
        console.log(1);
        if (data.status === 200) {
            console.log(data);
            setPhone(data.data.phone);
            console.log("Sesion creada!");
            setFlag(0);
        } else {
            toast.error("Status Error! Try Again.")
        }
    }

    const handleChange=(e)=>{
        e.persist();
        setValues(values=>({
        ...values,
        [e.target.name]: e.target.value
        }));
    };

    async function handleCodeSubmit(evt) {
        evt.preventDefault();

        // console.log("LOCAL STORE: ", localStorage);

        console.log(code);
        let data = await axios.post(codeRoute, {
            code,
            phone
        });

        if (data.status === 200) {
            console.log("Codigo correcto!");
            console.log(data);
            localStorage.setItem("USER", values.username);
            console.log(localStorage);
            setTimeout(function(){
                navigate("/chat");
            }, 6000);
            toast.success("User logged! Redirectioning...", toastOptions);
        } else {
            // toast.error("Status Error! Try Again.");
            console.log(1);
        }
    }

    const handleCodeChange=(e)=>{
        e.persist();
        setCode(e.target.value);
        console.log(phone);
    }

    return (
        <div className="login-page">                   
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="card fat">
                                <div className="card-body">
                                    <div className="card-title-container">
                                        { <h4 className="card-title"></h4> }
                                    </div>
                                    {
                                    flag ? 
                                    <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>

                                        <div className="form-group">
                                            <label>Username</label>
                                            <input id="username" type="text" className="form-control" minLength={4} value={values.username} onChange={handleChange} name="username" required />
                                                <div className="invalid-feedback">
                                                    UserId is invalid
                                                </div>                                            
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <input id="password" type="password" className="form-control" minLength={4} value={values.password} onChange={handleChange} name="password" required/>
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="form-group-m-0">
                                            <button id="login-btn" type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                            <button id="register-btn" className="btn btn-primary" onClick={() => {navigate("/register")}}>
                                                Register
                                            </button>
                                        </div>

                                    </form>
                                        :
                                    <form className="CODE-VALIDATION" onSubmit={handleCodeSubmit}>
                                        <div className="form-group">
                                            <label>CODE</label>
                                            <input id="code" type="text" className="form-control" minLength={5} value={code} onChange={handleCodeChange} name="code" />
                                                <div className="invalid-feedback">
                                                    UserId is invalid
                                                </div>                                            
                                        </div>
                                        <button id="code-btn" type="sumbit" className="btn btn-primary">
                                            Send code!
                                        </button>
                                    </form>
                                    }
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

// const mapStateToProps=({auth})=>{
//     console.log("state ",auth)
//     return {
//         loading:auth.loading,
//         error:auth.error
// }}


// const mapDispatchToProps=(dispatch)=>{

//     return {
//         authenticate :()=> dispatch(authenticate()),
//         setUser:(data)=> dispatch(authSuccess(data)),
//         loginFailure:(message)=>dispatch(authFailure(message))
//     }
// }


// export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
