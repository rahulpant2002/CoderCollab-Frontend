import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKEND_URL } from '../utils/constant';
import axios from 'axios';
import { addConnections } from '../store/connectionSlice';
import UserCard from './UserCard';
import Friend from './Friend';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector(store=>store.connection);

    const fetchConnection = async()=>{
        try{
            const res = await axios.get(BACKEND_URL + '/user/connections', {withCredentials:true});
            dispatch(addConnections(res.data.data));
            console.log(res.data.data);
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(!connection) fetchConnection();
    }, [])

    if(!connection) return;

    if(connection.length === 0){
        return (
            <h2 className='text-2xl font-bold text-center'>No Connection Found</h2>
        )
    }

  return connection && (
    <div>
        <h1 className='text-2xl font-bold text-center mt-3' >Connections - {connection.length}</h1>
        <div className='flex flex-col gap-3 mt-10 pl-3 py-3'>
            {
                connection.map(conn=><Friend key={conn._id} user={conn} />)
            }
        </div>
    </div>
  )
}

export default Connections