import React from 'react'

const Friend = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
    // const handleRemove = ()=>{

    // }

  return (
    <div className='flex w-[60%] mx-auto gap-3 bg-base-300 rounded-md'>
        <img src={photoUrl} alt="Profile Pic" className='w-[120px] h-[120px] rounded-full' />
        <div className='flex flex-col justify-center'>
            <div className='font-bold text-xl'> {firstName + " " + lastName} </div>
            {age && gender && <div> {age + ", " + gender}  </div>}
            <div> {about} </div>
            {/* <button className='bg-blue-600 text-black rounded-md px-1 w-16' onClick={handleRemove}>Remove</button> */}
        </div>
    </div>
  )
}

export default Friend