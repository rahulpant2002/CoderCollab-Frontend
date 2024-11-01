import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";
import { removeUser } from "../store/userSlice";
import useOnlineStatus from "../utils/useOnlineStatus"
import { removeFeed } from "../store/feedSlice";
import { removeConnection } from "../store/connectionSlice";
import { removeReceivedRequest } from "../store/receivedRequestSlice";
import { removeSentRequest } from "../store/sentRequestSlice";

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connection = useSelector(store=>store.connection);
  const receivedRequest = useSelector(store=>store.receivedRequest);

  const isOnline = useOnlineStatus();

  const handleLogout = async()=>{
    try{
      await axios.post(BACKEND_URL + '/logout', {}, {withCredentials : true});
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      dispatch(removeReceivedRequest());
      dispatch(removeSentRequest());
      navigate('/login');
    }
    catch(err){
      console.error(err);
    }
  }
  
  return (
    <div className="navbar bg-base-300">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-2xl font-bold text-blue-600"> CoderCollab </Link>
          </div>


          {user && <div className="flex-none gap-2">
              <Link to="/receivedRequest"  className="bg-base-100 px-2 py-2 rounded-md font-bold">
                Received Requests
              </Link>
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>

            {isOnline && <p className="font-bold">Welcome, {user.firstName}</p>}

            <div className="dropdown dropdown-end mr-5">
              <div tabIndex={0} role="button" className="btn relative btn-ghost btn-circle avatar">
                <p className="font-bold absolute top-0 right-0"> {isOnline ? "🟢" : "🔴"} </p>
                <div className="w-10 rounded-full">
                  <img alt="Profile Photo" src={ user.photoUrl } />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link to='/connections'>Connections</Link></li>
                <li><Link to='/sentRequest'>Sent Requests</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>

            </div>
            
          </div>}

    </div>
  )
}

export default NavBar;
