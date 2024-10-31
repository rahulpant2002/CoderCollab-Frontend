import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import Footer from './Footer';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store=>store.user);
  
  const fetchUser = async()=>{
    try{
      const res = await axios.get(BACKEND_URL + "/profile/view", {withCredentials:true});
      dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status === 401){
        navigate('/login');
      }
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!userData) fetchUser();
  }, [])

  return (
    <div className='flex flex-col min-h-full'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body;
