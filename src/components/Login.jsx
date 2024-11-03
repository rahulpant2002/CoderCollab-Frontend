import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async()=>{
        try{
            const res = await axios.post(BACKEND_URL + "/login", {
                emailId,
                password,
            }, {withCredentials : true});
            setErrorMessage("");
            dispatch(addUser(res.data));
            navigate('/');
        }
        catch(err){
            setErrorMessage(err.response.data);
        }
    };

    const handleSignUp = async()=>{
        try{
            const user = await axios.post(BACKEND_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials : true});
            setErrorMessage("");
            dispatch(addUser(user.data.data));
            navigate('/profile')
        }
        catch(err){
            setErrorMessage(err.response.data);
        }
    }

    const handleForgotPassword = async()=>{
        try{
            await axios.put(BACKEND_URL + "/profile/forgotPassword", {firstName, lastName, emailId, newPassword}, {withCredentials : true});
            setToastMessage("Password Set Successfully.");
            setInterval(()=>{
                setToastMessage("");
                setEmailId("");
                setPassword("");
                setIsForgotPassword(false);
                setIsLogin(true);
            }, 2000);
        }
        catch(err){
            setErrorMessage(err.response.data)
        }
    }

  return (
    <div className="flex justify-center items-center mt-3">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center font-bold text-xl">{isForgotPassword ? "Forgot Password" : isLogin ? "Log In" : "Sign Up"}</h2>

                {(!isLogin || isForgotPassword) &&   <>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input type="text" value={firstName} onChange={e => {setFirstName(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                        </label> 

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" value={lastName} onChange={e => {setLastName(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </>
                } 

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email-Id</span>
                    </div>
                    <input type="text" value={emailId} onChange={e => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                {!isForgotPassword && <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" value={password} onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                isLogin ? handleLogin() : handleSignUp();
                            }
                        }} onChange={e => {setPassword(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                </label>}

                {
                  isForgotPassword &&  <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">New Password</span>
                        </div>
                        <input type="password" value={newPassword} onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                handleForgotPassword();
                            }
                        }} onChange={e => {setNewPassword(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                    </label>
                }

                {errorMessage && <p className="text-red-600 text-lg">{errorMessage}</p>}
                
                <div className="card-actions justify-center mt-3 ">
                    <button className="btn btn-primary font-bold text-lg " onClick={ isLogin ? handleLogin : isForgotPassword ? handleForgotPassword : handleSignUp} >
                        { isForgotPassword ? "OK" : isLogin ? "Login" : "Sign Up" }
                    </button>
                </div>

                {<p className="text-center text-blue-500 cursor-pointer" onClick={()=>{
                    setIsLogin(!isLogin)
                    setIsForgotPassword(false)}}>
                    {isLogin ? "New User, Sign Up here" : "Already a user, Log In here"}
                </p>}

                {
                    !isForgotPassword && <p className="font-bold text-center cursor-pointer" onClick={()=>setIsForgotPassword(true)}>Forgot Password?</p>
                }


                {toastMessage && <div className="toast toast-top toast-center z-10">
                    <div className="alert alert-success">
                        <span>{toastMessage}</span>
                    </div>
                </div>}

            </div>
        </div>
    </div>
  )
}

export default Login;
