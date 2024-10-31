// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { BACKEND_URL } from '../utils/constant';

const SentRequest = () => {
//   const sentRequest = useSelector(store=>store.sentRequest);

//   const fetchSentRequest = async()=>{
//     try{
//       const res = await axios.get(BACKEND_URL+'user/sentRequests', {withCredentials:true});
//       console.log(res);
//     }
//     catch(err){
//       console.error(err);
//     }
//   }

//   useEffect(()=>{
//     if(!sentRequest) fetchSentRequest();
//   }, [])

//   if(!sentRequest) return;
//   if(sentRequest.length === 0){
//     return(
//       <div className='font-bold text-center text-xl'>No Request Sent</div>
//     )
//   }

  return (
    <div>RequestSent</div>
  )
}

export default SentRequest;