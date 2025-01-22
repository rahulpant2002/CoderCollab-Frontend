import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";
import { removeUser } from "../store/userSlice";
import useOnlineStatus from "../utils/useOnlineStatus";
import { clearFeed } from "../store/feedSlice";
import { clearConnection } from "../store/connectionSlice";
import { clearReceivedRequest } from "../store/receivedRequestSlice";
import { clearSentRequest } from "../store/sentRequestSlice";
import Search from "./SearchBar";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const handleLogout = async () => {
    try {
      await axios.post(BACKEND_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnection());
      dispatch(clearReceivedRequest());
      dispatch(clearSentRequest());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar flex flex-col bg-base-300 px-4 py-2 md:px-10">
      <div className="flex flex-row items-center justify-between w-full md:flex-nowrap">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-blue-600">
            CoderCollab
          </Link>
          {user && <Link to="/" className="btn btn-ghost bg-base-100 text-xl text-green-300">
            Home 🏠
          </Link>}
        </div>

        {user && (
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <Link to="/receivedRequest" className="bg-base-100 px-2 py-2 rounded-md font-bold">
              Received Requests
            </Link>
            <Search />
            {isOnline && <p className="font-bold">Welcome, {user.firstName}</p>}

            <div className="dropdown dropdown-end mr-5">
              <div
                tabIndex={0}
                role="button"
                className="btn relative btn-ghost btn-circle avatar"
              >
                <p className="font-bold absolute top-0 right-0">
                  {isOnline ? "🟢" : "🔴"}
                </p>
                <div className="w-10 rounded-full">
                  <img alt="Profile Photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 bg-base-300 rounded-box z-[1] p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/receivedRequest">Received Requests</Link>
                </li>
                <li>
                  <Link to="/sentRequest">Sent Requests</Link>
                </li>
                <li>
                  <Link to="/updatePassword">Update Password</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {user && (
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn relative btn-ghost btn-circle avatar"
              >
                <p className="font-bold absolute top-0 right-0">
                  {isOnline ? "🟢" : "🔴"}
                </p>
                <div className="w-10 rounded-full">
                  <img alt="Profile Photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 bg-base-300 rounded-box z-[1] p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/receivedRequest">Received Requests</Link>
                </li>
                <li>
                  <Link to="/sentRequest">Sent Requests</Link>
                </li>
                <li>
                  <Link to="/updatePassword">Update Password</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="w-full px-4 mt-2 md:hidden">
        <Search className="w-full" />
      </div>
    </div>
  );
};

export default NavBar;
