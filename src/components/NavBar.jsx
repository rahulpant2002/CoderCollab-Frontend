import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      await axios.post(BACKEND_URL + '/logout', {}, {withCredentials : true});
      dispatch(removeUser());
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
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>

            <p className="font-bold">Welcome, {user.firstName}</p>

            <div className="dropdown dropdown-end mr-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Profile Photo" src={ user.photoUrl } />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to=''>Settings</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>

            </div>
            
          </div>}

      </div>
  )
}

export default NavBar;
