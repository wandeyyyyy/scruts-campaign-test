import React from 'react'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'
const Overview = () => {
  return (
    <div className='md:ml-72  '>
      <div className='md:flex md:items-center md:justify-between px-10'>
      <div>
      <p className='font-extrabold text-[#247B7B] text-[24px]'>OverView</p>
      </div>
<div className='flex  items-center p-3'>
  <div className='border border-2-black p-3 md:flex'>
    <div className='md:flex md:items-center gap-2 px-3 md:border-r-2'><img src="/images/date.png" alt="" /> Date Range </div>
    <div className='px-3'>
      <input type="date" name="" id="" placeholder='November 2022 - November 2024'/>
      </div>
  </div> 
  <div>
    <button className='flex items-center gap-2 bg-[#F0F4F4] py-3 px-4'><img src="/images/export.png" alt="export" sizes={24} className='shadow-2xl cursor-pointer' /> <span className='hidden md:block'>Export</span></button></div>
</div>
</div>
<div className='flex justify-center mt-20'>
  <div>
  <img src="/images/empty-RBIL0twm1B.png" alt="" />
  <p className='font-bold mt-10'>No activity yet. Create anew campaign to get started</p>
  <Link to='/create-list'>
  <div className='flex justify-center mt-6 cursor-pointer'>
 <button className='bg-[#247B7B] text-white   w-[200px] border rounded-md font-semibold'> <div className='flex items-center justify-center py-4'><FaPlus className='mr-4'/> <p>New Campaign </p> 
 </div></button>
 </div> 
 </Link>
  </div>
</div>


    </div>
  )
}

export default Overview