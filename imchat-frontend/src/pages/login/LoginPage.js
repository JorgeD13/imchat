import {useEffect, useState} from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../../redux/authActions';
import { userLogin } from '../../api/authenticationService';
import {Alert,Spinner} from 'react-bootstrap';
import { codeRoute, loginRoute } from "../../utils/APIRoutes";
import CryptoJS from 'crypto-js';
import { toast } from "react-toastify";
// import store from '../../redux/store'

import './LoginPage.scss';

const LoginPage=({loading,error,...props})=>{

    const [flag, setFlag] = useState(1);

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [code, setCode] = useState(0);
    const [phone, setPhone] = useState(0);

    useEffect = () =>{
        setValues(
            {
                username: '',
                password: ''
            }
        );
        setCode(123456);
        setPhone(999999999);
        setFlag(1);
    }

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
            setPhone(data.data.phone);
            console.log("Sesion creada!");
            console.log(data);
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
        } else {
            toast.error("Status Error! Try Again.")
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
                                            <input id="username" type="text" className="form-control" minLength={5} value={values.username} onChange={handleChange} name="username" required />
                                                <div className="invalid-feedback">
                                                    UserId is invalid
                                                </div>                                            
                                        </div>

                                        <div className="form-group">
                                            <label>Password
                                                { <a href="forgot.html" className="float-right">
                                                    Forgot Password?
                                                </a> }
                                            </label>
                                            <input id="password" type="password" className="form-control" minLength={4} value={values.password} onChange={handleChange} name="password" required/>
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="form-group-m-0">
                                            <button id="login-btn" type="submit" className="btn btn-primary">
                                                Login
                                                {loading && (
                                                    <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                )}
                                                {/* <ClipLoader
                                                //css={override}
                                                size={20}
                                                color={"#123abc"}
                                                loading={loading}
                                                /> */}
                                            </button>
                                            <button id="register-btn" type="submit" className="btn btn-primary">
                                                Register
                                                {loading && (
                                                    <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                )}
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
                                    { error &&
                                    <Alert style={{marginTop:'20px'}} variant="danger">
                                        {error}
                                    </Alert>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
export default LoginPage;
