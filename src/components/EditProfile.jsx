import { useState } from "react"
import UserCard from "./UserCard";
import { BACKEND_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills || "");
    const [error, setError] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    const dispatch = useDispatch();

    const handleSaveProfile = async()=>{
        try{
            const res = await axios.put(BACKEND_URL + "/profile/edit", {firstName,lastName,age,gender,
                photoUrl, about, skills
            }, {withCredentials : true});

            setIsUpdated(true);
            setTimeout(()=>{
                setIsUpdated(false);
            }, 2000);

            dispatch(addUser(res?.data?.data));
        }
        catch(err){
            setError(err?.response?.data);
        }
    }

  return (
    <div className="my-2 flex gap-2 h-[80%]">
        <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Edit Profile</h2>

                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Age</span>
                        </div>
                        <input type="text" value={age} onChange={e=>setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Gender</span>
                        </div>
                        <input type="text" value={gender} onChange={e=>setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Photo</span>
                        </div>
                        <input type="text" value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text">About</span>
                    </div>
                    <textarea value={about} onChange={e=>setAbout(e.target.value)} className="textarea textarea-bordered min-h-20 w-[320px]"></textarea>
                </label>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Skills</span>
                    </div>
                    <textarea value={skills} onChange={e=>setSkills(e.target.value.split(','))} className="textarea textarea-bordered min-h-20 w-[320px]"></textarea>
                </label>

                {error && <p className="text-red-500">{error}</p>}
                <button className="btn btn-primary font-bold mt-2" onClick={handleSaveProfile}>Save Profile</button>
            </div>

            {isUpdated && <div className="toast toast-top toast-center z-10">
                <div className="alert alert-success">
                    <span>Profile Updated Successfully.</span>
                </div>
            </div>}

        </div>

        <UserCard user={ {firstName, lastName, photoUrl, age, gender, about} }/>
    </div>
  )

}

export default EditProfile