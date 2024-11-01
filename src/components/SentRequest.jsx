import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKEND_URL } from '../utils/constant';
import Friend from './Friend';
import { addSentRequest } from '../store/sentRequestSlice';

const SentRequest = () => {
  const sentRequest = useSelector(store=>store.sentRequest);
  const dispatch = useDispatch();

  const fetchSentRequest = async()=>{
    try{
      const res = await axios.get(BACKEND_URL+'/user/sentRequests', {withCredentials:true});
      dispatch(addSentRequest(res.data.allSentRequests));
      console.log(res.data.allSentRequests);
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!sentRequest) fetchSentRequest();
  }, [])

  if(!sentRequest) return;
  if(sentRequest.length === 0){
    return <div className='font-bold text-center text-xl'>No Request Sent</div>
    
  }

  return (
    <div>
      <div className='font-bold text-xl text-center my-3'>Sent Requests - {sentRequest.length}</div>
      <div className='flex flex-col gap-3 mb-3'>
        {
          sentRequest.map(req=><Friend key={req._id} user={req.toUserId} /> )
        }
      </div>
    </div>
  )
}

export default SentRequest;