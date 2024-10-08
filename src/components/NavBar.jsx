import React from 'react'
import { FaSearch, FaBell, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'



const NavBar = () => {
  return (
    <>

    <div className='md:ml-72 flex w-full justify-between items-center px-10 py-6 bg-white shadow-sm'>
      <div>
      <img src="/images/Scrutz.png" alt="logo" className='w-[40px] h-[22px] md:hidden' />
     
      </div>

     <div className='border-2-black border p-2 w-[150px] lg:w-[500px] flex justify-between'>
            <input type="text" placeholder='Search...' className='outline-none ' /> 
            <span className='hidden md:block'><button><FaSearch/></button></span>
      </div>
        <div className='flex items-center gap-6'>
            <FaBell/>
        <div className='flex items-center gap-3'>
            <FaUser/>
            <button className='hidden md:block bg-[#247B7B] shadow-2xl text-white font-bold px-4 py-2 rounded-sm'>Big Tech
            </button>
            </div>
            </div>
    </div>
    </>
  )
}

export default NavBar