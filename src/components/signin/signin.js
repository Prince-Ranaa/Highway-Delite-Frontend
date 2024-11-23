
import "./signin.css"
import signInImagePath from '../../images/signinImage.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function SignInComponent() {
    const [formData, setFormData] = useState({});
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    async function signIn(e) {
        e.preventDefault();
        try {
            // const response = await axios.post("http://localhost:5000/signin", {
            //     formData
            // });
            const response = await axios.post("https://highway-delite-backend-e9eo.onrender.com/signin", {
                formData
            });
            if (response.data.invalidCredential) {
                setInvalidCredentials(true)
            } else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                navigate("/");
            }
        } catch (error) {
            console.log("error")
        }


    }

    const navigate = useNavigate();

    function signUp(e) {
        e.preventDefault();
        navigate("/signup")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div>
            <div id="signUpContainer">
                <div id="imgSection">
                    <div>

                        <img src={signInImagePath} alt="signup" />

                    </div>
                </div>

                <div id="formSection">
                    <div className="formContainer">
                        <form onSubmit={signIn}>
                            <div className="formHeading">
                                <h2> Let Us Know <span className="redText">!</span></h2>
                            </div>
                            <div className="inputContainer">   <input placeholder="Email" name="email" onChange={handleChange} type="email" required /></div>
                            <div className="inputContainer">   <input placeholder="Password" name="password" onChange={handleChange} required />
                                {invalidCredentials && (
                                    <span className="redText">*Invalid Credentials</span>
                                )}

                            </div>

                            <button className="signInBtn"><b>Sign In</b></button>
                            <button className="outlinedBtn" onClick={signUp}  ><b>Sign Up</b></button>
                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default SignInComponent;