
import "./signin.css"
import signInImagePath from '../../images/signinImage.png';


function SignInComponent() {
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
                        <form>
                            <div className="formHeading">
                                <h2> Let Us Know <span className="redText">!</span></h2>
                            </div>
                            <div className="inputContainer">   <input placeholder="Email" /></div>
                            <div className="inputContainer">   <input placeholder="Password" /></div>

                            <button className="signInBtn"><b>Sign In</b></button>
                            <button className="outlinedBtn"><b>Sign Up</b></button>
                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default SignInComponent;