import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";

const Login = () => {
    const [emailId, setEmailId] = useState("rahul@gmail.com");
    const [password, setPassword] = useState("rahul@123");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const res = await axios.post(BACKEND_URL + "/login", {
                emailId,
                password,
            }, {withCredentials : true});
            dispatch(addUser(res.data));
            navigate('/');
        }
        catch(err){
            console.error(err.response.data);
        }
    };

  return (
    <div className="flex justify-center items-center h-[60vh]">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center font-bold text-xl">Login</h2>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email-Id</span>
                    </div>
                    <input type="text" value={emailId} onChange={e => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="text" value={password} onChange={e => {setPassword(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                </label> 

                <div className="card-actions justify-center mt-3 ">
                    <button className="btn btn-primary font-bold text-lg " onClick={handleLogin} >Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
