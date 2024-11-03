import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL } from '../utils/constant';
import { addFeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async(page)=>{
    setLoading(true)
    try{
      const res = await axios.get(BACKEND_URL + `/user/feed?page=${page}&limit=10`, {withCredentials:true});
      dispatch(addFeed(res.data.users));
    }
    catch(err){
        console.error(err);
    }
  }

  useEffect(()=>{
    if(!feed || feed.length===0){
      setPage(page);
      fetchFeed(page);
    }
  }, [feed])

  if(!feed) {
    return;
  }

  if(feed.length === 0) {
    return <div className='text-xl text-center font-bold mt-3'>No More Users</div>
  }

  return (
    <div className='flex justify-center my-1'>
        <UserCard user={feed[0]} />
    </div>
  )

}

export default Feed;