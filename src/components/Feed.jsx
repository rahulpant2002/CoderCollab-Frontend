import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL } from '../utils/constant';
import { addFeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);

  const fetchFeed = async()=>{
    try{
      const res = await axios.get(BACKEND_URL + '/user/feed', {withCredentials:true});
      dispatch(addFeed(res.data.users));
    }
    catch(err){
        console.error(err);
    }
  }

  useEffect(()=>{
    if(!feed) fetchFeed();
  }, [])

  return (
    feed && <div className='flex justify-center py-3'>
        <UserCard user={feed[0]} />
    </div>
  )

}

export default Feed;