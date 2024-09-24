import React from 'react'
import { FaSearch, FaBell, FaUser } from 'react-icons/fa'


const NavBar = () => {
  return (
    <div className='ml-72 flex w-full justify-between items-center px-10 py-6 bg-white shadow-sm'>
        <div className='border-2-black border p-2 w-[500px] flex justify-between'>
            <input type="text" placeholder='Search...' className='outline-none w-[400px]' /> 
            <span><button><FaSearch/></button></span>
        </div>
        <div className='flex items-center gap-6'>
            
            <FaBell/>
        <div className='flex items-center gap-3'>
            <FaUser/>
            <button>Big Tech</button>
            </div>
            </div>
    </div>
  )
}

export default NavBar