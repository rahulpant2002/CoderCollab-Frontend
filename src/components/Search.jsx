import React from 'react'
import { useSelector } from 'react-redux'
import Friend from './Friend';

const Search = () => {
    const searchRes = useSelector(store=>store.search);

    if(!searchRes) return;
    if(searchRes.length===0) return <div className='text-center font-bold text-xl'>No User Found</div>

  return (
    <div className='flex flex-col gap-3 mt-4'>
        {
            searchRes.map(res=><Friend key={res._id} data={{user : res, _id : res._id, type : "search"}}/>)
        }
    </div>
  )
}

export default Search