import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../utils/constant";

const UpdatePassword = () => {
    const [existingPassword, setExistingPassword] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleButton = async()=>{
        try{
            await axios.put(BACKEND_URL+"/profile/updatePassword", {existingPassword, updatedPassword}, {withCredentials : true});
            setToastMessage("Password Updated Successfully.");
            setErrorMessage("");
            setTimeout(()=>{
                setToastMessage("");
            }, 1500);
        }
        catch(err){
            setErrorMessage(err.response.data);
        }
    }

  return (
    <div className="flex justify-center items-center mt-3">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center font-bold text-xl">Update Password</h2>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Current Password</span>
                    </div>
                    <input type="text" value={existingPassword} onChange={e => {setExistingPassword(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                </label> 

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">New Password</span>
                    </div>
                    <input type="password" value={updatedPassword} onChange={e => {setUpdatedPassword(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                </label>


                {errorMessage && <p className="text-red-600 text-lg">{errorMessage}</p>}
                
                <div className="card-actions justify-center mt-3 ">
                    <button className="btn btn-primary font-bold text-lg " onClick={ handleButton} >
                        Update
                    </button>
                </div>

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

export default UpdatePassword;