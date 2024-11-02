import axios from "axios";
import { BACKEND_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeOneFeed } from "../store/feedSlice";

const UserCard = ({user}) => {
    const {_id, photoUrl, age, firstName, lastName, gender, about} = user;
    const dispatch = useDispatch();
    
  const handleButton = async(status, _id)=>{
    try{
      await axios.post(BACKEND_URL + '/request/send/' + status + '/' + _id, {}, {withCredentials : true});
      dispatch(removeOneFeed(_id));
    }
    catch(err){
      console.error(err);
    }
  } 

  return  (
    <div className="card bg-base-300 w-96 shadow-xl ">
      <figure>
        <img
          src={photoUrl}
          alt="Profile Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>

        <div className="card-actions justify-center">
          <button className="btn btn-secondary" onClick={()=>handleButton("ignored", _id)}>Ignore</button>
          <button className="btn btn-primary" onClick={()=>handleButton("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard