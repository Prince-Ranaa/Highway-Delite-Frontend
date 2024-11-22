
import "./signup.css"
import signUpImagePath from '../../images/signupImage.png';

function SignUpComponent() {
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
                        <form>
                            <div className="formHeading">
                                <h2> Let Us Know <span className="redText">!</span></h2>

                                <div> <button>Sign In</button></div>
                            </div>
                            <div className="inputContainer"> <input placeholder="First Name" type="text" /></div>
                            <div className="inputContainer"> <input placeholder="Last Name" type="text" /></div>
                            <div className="inputContainer"> <input placeholder="Set Password" type="password" /></div>
                            <div className="inputContainer"> <input placeholder="Retype Password" type="password" /></div>
                            <div className="inputContainer">
                                <select>
                                    <option >Contact Mode</option>
                                    <option >Email</option>
                                    <option >Phone</option>
                                </select>
                            </div>
                            <div className="inputContainer">   <input placeholder="Email" /></div>

                            <button className="signUpBtn"><b>Sign Up</b></button>
                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default SignUpComponent