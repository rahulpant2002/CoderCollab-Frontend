import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/constant';
import { addSearch } from '../store/searchSlice';


const Search = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allUser, setAllUser] = useState();
    const loggedInUser = useSelector(store=>store.user);

    const fetchAllUsers = async()=>{
      try{
        const res = await axios.get(BACKEND_URL + '/allUsers', {withCredentials : true});
        setAllUser(res.data.data);
      }
      catch(err){
        console.error(err);
      }
    }

    useEffect(()=>{
      if(!allUser) fetchAllUsers();
    }, [])
    
    
    const handleSearch = ()=>{
      const res = allUser.filter((res)=>{
          const fullName = res.firstName + " " + res.lastName;
          const skills = res.skills.map(x=>x.toLowerCase().trim());  
          return ( ( fullName.toLowerCase().includes(text.toLowerCase()) || skills.includes(text.toLowerCase()) ) && res._id !== loggedInUser._id);
        })
        dispatch(addSearch(res));
        navigate("/search")
      }
      
    if(!allUser) return;

  return (
    <div className="form-control flex flex-row gap-1">
        <input type="text" value={text} onChange={e=>setText(e.target.value)} onKeyDown={(e)=>{
            if(e.key==="Enter") handleSearch();
        }} placeholder="Search Skills/Developers" className="input input-bordered w-24 md:w-auto" />
        <button className='bg-white opacity-80 rounded-lg' onClick={handleSearch}>🔍</button>
    </div>
  )
}

export default Search