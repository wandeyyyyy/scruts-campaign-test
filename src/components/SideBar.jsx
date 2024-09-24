import React from 'react'
import { FaPlus,   FaLightbulb   } from 'react-icons/fa'; 
import {MdCampaign, MdDashboard, MdSettings} from 'react-icons/md'
import { Link } from 'react-router-dom';
import '../App.css'


const SideBar = () => {
  
  return (
    <div className=' hidden md:block md:fixed h-full bg-[#F0F4F4] w-72'>
        <div className='flex  items-center justify-center gap-5 my-10'>
            <img src="/images/scrutz-logo.png" alt="" />
            <img src="/images/Scrutz.png" alt="" className='w-[95px]' />
         </div>
           <ul className='w-full'>
                <li className='w-full flex justify-center'><div href="" className='flex items-center justify-center bg-[#247B7B] text-white w-[75%] py-4 border rounded-md font-semibold' > <FaPlus color='white' className='mr-5'/>New Campaign</div>
                </li>
              <Link to='/'>
                <li className='ml-16 font-normal  w-[190px] mt-12'>
                    <p  className='flex items-center hover:bg-white p-3 cursor-pointer '>< MdDashboard className='mr-4' size={24}/> Overview</p>
                </li>
              </Link>
              <Link to='/campaignlist'>
                <li className=' ml-16 font-normal  w-[190px]'>
                    <div>
                    <div href="" className='flex items-center hover:bg-white p-3'> <MdCampaign className='mr-4' size={24}/> Campaign</div>
                        </div>
                 </li>
                </Link>
                 <Link to='/'>
                <li className=' ml-16 font-normal  w-[210px]'>
                    <div>
                    <div href="" className='flex items-center hover:bg-white p-3'> < FaLightbulb  className='mr-4' size={24}/>Market Intelligence</div>
                        </div>
                  </li>
                  </Link>
               <Link to='/'>
                       <li className='  ml-16 font-normal  w-[190px]'><div href="" className='flex items-center  hover:bg-white p-3'> <MdSettings className='mr-4 ' size={24}/>Account Settings</div>
                       </li>
                </Link>
          </ul>
            <div className='flex justify-center'>
            <div className='text-center w-[75%] bg-white mt-10 py-10 px-6 rounded-md'>
            <div  className='flex justify-center'>
                <img src="/images/question-mark.png" alt=""  />
             </div>
       
            <p className='help'>Need help? </p>
            <p className='text-[12px]'>We're readily available to provide help</p>
            <button className='border-[#247B7B]  border-2  py-1 px-4 rounded-md mt-4 text-[12px]'>Get Help</button>

             </div>
            </div>
            
    </div>
  )
}

export default SideBar