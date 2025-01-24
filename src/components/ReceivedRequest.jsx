import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKEND_URL } from '../utils/constant';
import axios from 'axios';
import { addReceivedRequest } from '../store/receivedRequestSlice';
import Friend from './Friend';

const ReceivedRequest = () => {
  const receivedRequest = useSelector(store=>store.receivedRequest);
  const dispatch = useDispatch();

  const fetchReceivedRequest = async()=>{
    try{
      const req = await axios.get(BACKEND_URL+"/user/receivedRequests", {withCredentials : true});
      const filteredRequests = req.data.allReceivedRequests.filter(req => req.fromUserId != null);
      dispatch(addReceivedRequest(filteredRequests));
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchReceivedRequest();
  }, [receivedRequest]);

  if(!receivedRequest) return;
  if(receivedRequest.length === 0){
    return <div className='text-xl font-bold text-center'>No Request</div>
  }

  return (
    <div>
      <div className='font-bold text-xl text-center my-3'>Received Requests - {receivedRequest.length}</div>
      <div className='flex flex-col gap-3 mb-3'>
        {
          receivedRequest.map(req=><Friend key={req._id} data={{user : req.fromUserId, _id : req._id, type : "receivedRequests"}} />)
        }
      </div>
    </div>
  )
}

export default ReceivedRequest;