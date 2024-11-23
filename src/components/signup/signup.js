
import "./signup.css"
import signUpImagePath from '../../images/signupImage.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function SignUpComponent() {
    const navigate = useNavigate();

    const [invalidOtp, setInvalidOtp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emailPresent, setEmailPresent] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        retypePassword: "",
        contactMode: "",
        email: "",
    });

    const [otp, setOtp] = useState("")
    const [verificationOtp, setVerificationOtp] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [showOtpVerification, setShowOtpVerification] = useState(false)

    async function sendOtp(e) {
        e.preventDefault();

        try {
            if (formData.password == formData.retypePassword) {
                setLoading(true)
                setPasswordError(false)

                const response = await axios.post("http://localhost:5000/otpverification", {
                    formData
                });
                // const response = await axios.post("https://highway-delite-backend-e9eo.onrender.com/otpverification", {
                //     formData
                // });
                if (response.data.emailFound) {
                    setLoading(false)
                    setEmailPresent(true);


                } else {
                    setLoading(false)
                    setOtp(response.data.otp)
                    setShowOtpVerification(true)
                }
            } else {
                setPasswordError(true)
            }

        } catch (err) {
            console.log("Failed to send OTP: " + err.response?.data?.error);
        }

    }

    async function verifyOtp() {
        try {
            if (verificationOtp == otp) {
                const response = await axios.post("http://localhost:5000/signup", {
                    formData
                });
                // const response = await axios.post("https://highway-delite-backend-e9eo.onrender.com/signup", {
                //     formData
                // });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('firstName', response.data.user.firstName);
                localStorage.setItem('lastName', response.data.user.lastName);
                setShowOtpVerification(false)
                setInvalidOtp(false)
                navigate("/");
            } else {
                setInvalidOtp(true)
            }

        } catch (error) {
            console.log(error);

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange2 = (e) => {
        setVerificationOtp(e.target.value);
    };

    function navigateToSignin() {
        navigate("/signin");
    }

    function closeEmailPopup() {
        setEmailPresent(false);
    }

    return (
        <div>
            <div id="signUpContainer">
                <div id="imgSection">
                    <div>
                        <img src={signUpImagePath} alt="signup" />
                    </div>
                </div>

                <div id="formSection">
                    <div className="formContainer">
                        <form onSubmit={sendOtp}>
                            <div className="formHeading">
                                <h2> Let Us Know <span className="redText">!</span></h2>

                                <div> <button className="simpleBtn" onClick={navigateToSignin}>Sign <span className="redText"> In</span></button></div>
                            </div>
                            <div className="inputContainer" > <input placeholder="First Name" type="text" name="firstName" onChange={handleChange} required
                            /></div>
                            <div className="inputContainer"> <input placeholder="Last Name" type="text" name="lastName" onChange={handleChange} required /></div>
                            <div className="inputContainer"> <input placeholder="Set Password" type="password" name="password" onChange={handleChange} required minLength={8} /></div>
                            <div className="inputContainer"> <input placeholder="Retype Password" type="password" name="retypePassword" onChange={handleChange} required />
                                {passwordError && (
                                    <span className="redText">*Password does not match.</span>
                                )}
                            </div>
                            <div className="inputContainer">
                                <select
                                    name="contactMode"
                                    value={formData.contactMode}
                                    onChange={handleChange}
                                    required
                                    style={{ color: "gray" }}
                                >
                                    <option value="" disabled >Contact Mode</option>
                                    <option value="Email" style={{ color: "black" }}>Email</option>
                                    <option value="Phone" style={{ color: "black" }}>Phone</option>
                                </select>
                            </div>
                            <div className="inputContainer">   <input placeholder="Email" type="email" name="email" onChange={handleChange} required /></div>

                            <button className="signUpBtn"><b>Sign Up</b></button>
                        </form>
                    </div>
                </div>

            </div>


            {showOtpVerification && (
                <div className="otpPopup">
                    <div className="popup-content">
                        <h2>Verify your email</h2>
                        <input placeholder="Enter the OTP" className="otpPopupInput" onChange={handleChange2} />
                        {invalidOtp && (<div>
                            <span style={{ color: "red", fontSize: "10px" }} >Invalid OTP. Please try again.</span>
                        </div>)}
                        <div onClick={verifyOtp}><button className="popupBtn" >Verify</button></div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="loadingPopup">
                    <div className="loadingPopup-content">
                        <h2>Loading...</h2>
                    </div>
                </div>
            )}

            {emailPresent && (
                <div className="loadingPopup">
                    <div className="popup-content">
                        <h2>Email already registered. Try logging in or use different email</h2>
                        <div onClick={closeEmailPopup}><button className="popupBtn" >Close</button></div>
                    </div>
                </div>
            )}


        </div >
    )
}

export default SignUpComponent