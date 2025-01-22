import React from 'react';
import { BACKEND_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeOneReceivedRequest } from '../store/receivedRequestSlice';
import { removeOneSentRequest } from '../store/sentRequestSlice';
import { removeOneConnection } from '../store/connectionSlice';
import { Link } from 'react-router-dom';

const Friend = ({ data }) => {
  const { user, type, _id } = data;
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleReceivedRequest = async (status, _id) => {
    try {
      const res = await axios.post(BACKEND_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true });
      dispatch(removeOneReceivedRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (_id) => {
    try {
      const res = await axios.post(BACKEND_URL + '/request/cancel/' + _id, {}, { withCredentials: true });
      dispatch(removeOneSentRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (_id) => {
    try {
      const res = await axios.post(BACKEND_URL + '/connection/remove/' + _id, {}, { withCredentials: true });
      dispatch(removeOneConnection(_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-[60%] mx-auto gap-3 p-4 bg-base-300 rounded-md shadow-md">
      <img src={photoUrl} alt="Profile Pic" className="w-24 h-24 md:w-[120px] md:h-[120px] rounded-full" />
      
      <div className="flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-0">
        <div className="font-bold text-xl text-white">{`${firstName} ${lastName}`}</div>
        
        {age && gender && (
          <div className="text-sm text-white opacity-80">{`${age}, ${gender}`}</div>
        )}
        
        <div className="text-white opacity-80 mt-1">{about}</div>


        <div className="flex flex-row gap-3 my-3">
          {type === 'receivedRequests' && (
            <>
              <button
                className="bg-blue-600 text-white rounded-md px-3 py-1 w-20"
                onClick={() => handleReceivedRequest('accepted', _id)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-white rounded-md px-3 py-1 w-20"
                onClick={() => handleReceivedRequest('rejected', _id)}
              >
                Reject
              </button>
            </>
          )}
          
          {type === 'sentRequests' && (
            <button
              className="bg-yellow-600 text-white rounded-md px-3 py-1 w-20"
              onClick={() => handleCancel(_id)}
            >
              Cancel
            </button>
          )}
          
          {type === 'connections' && (
            <>
              <button
                className="bg-red-600 text-white rounded-md px-3 py-1 w-20"
                onClick={() => handleRemove(_id)}
              >
                Remove
              </button>
              <Link to={'/chat/'+_id}><button className="bg-green-600 text-white rounded-md px-3 py-1 w-20">
                  Chat
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
