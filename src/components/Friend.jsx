import React from 'react'
import { BACKEND_URL } from '../utils/constant';
import axios from 'axios';

const Friend = ({data}) => {
    const {user, type, _id} = data;
    // console.log(user);
    const {firstName, lastName, photoUrl, age, gender, about} = user;

    const handleReceivedRequest = async(status, _id)=>{
      try{
        const res = await axios.post(BACKEND_URL+'/request/review/'+status+'/'+_id, {}, {withCredentials : true});
        console.log(res);
      }
      catch(err){
        console.error(err);
      }
    }

    const handleCancel = async(_id)=>{
      try{
        const res = await axios.post('http://localhost:7777/connection/remove' +_id, {}, {withCredentials:true});
        console.log(res);
      }
      catch(err){
        console.error(err);
      }
    }

    const handleRemove = async(_id)=>{
      try{
        const res = await axios.post(BACKEND_URL+'/connection/remove/'+_id, {}, {withCredentials:true});
        console.log(res);
      }
      catch(err){
        console.error(err);
      }
    }

  return (
    <div className='flex w-[60%] mx-auto gap-3 bg-base-300 rounded-md'>
        <img src={photoUrl} alt="Profile Pic" className='w-[120px] h-[120px] rounded-full' />
        <div className='flex flex-col justify-center'>
            <div className='font-bold text-xl'> {firstName + " " + lastName} </div>
            {age && gender && <div> {age + ", " + gender}  </div>}
            <div> {about} </div>

            {type === 'receivedRequests' && <div className='flex flex-row gap-3 my-2'>
              <button className='bg-blue-600 text-black rounded-md px-1 w-16' onClick={()=>handleReceivedRequest('accepted', _id)}>Accept</button>
              <button className='bg-blue-600 text-black rounded-md px-1 w-16' onClick={()=>handleReceivedRequest('rejected', _id)}>Reject</button>
            </div>}

            {type === 'sentRequests' && <div>
              <button className='bg-blue-600 text-black rounded-md px-1 w-16 my-2' onClick={()=>handleCancel(_id)}>Cancel</button>
            </div>}

            {type === 'connections' && <div>
              <button className='bg-blue-600 text-black rounded-md px-1 w-16 my-2' onClick={()=>handleRemove(_id)}>Remove</button>
            </div>}
        </div>
    </div>
  )
}

export default Friend