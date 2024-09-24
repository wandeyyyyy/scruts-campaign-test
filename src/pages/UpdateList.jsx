import React from 'react'

const UpdateList = () => {
  return (
 
        <div className='ml-72'>
          <div>
            <div className='w-[60%] flex justify-between' >
            <h1 className='font-extrabold text-[#247B7B] text-[24px]'>Campaign Information</h1>
              <div className=' flex'>
               <p className='border-r-gray-500 py-2 px-3'>Campaign Status</p> 
               <p className='text-[#247B7B] py-2 px-3'>Active</p>
              </div>
            </div>
            <form className='mt-10 flex flex-col gap-6'>
                <div>
                    <label htmlFor="name" className='required'>Campaign Name</label> <br />
                    <input type="text" name="" id="" placeholder='e.g The future is now' className='outline-none border border-gray-500 w-[60%] px-5 py-2 mt-2 rounded-md' />
                </div>
                <div>
                    <label htmlFor="describe" >Campaign Description</label> <br />
                  <textarea name="" id="" placeholder='Please add a description to your campaign'  className='outline-none border border-gray-500 w-[60%] px-5 py-2 mt-2 rounded-md'></textarea>
                </div>
                <div className='flex w-[60%] justify-between'>
                    <div>
                    <label htmlFor="SDate" className='required'>Start Date</label> <br />
                    <input type="date" className='outline-none border-2-black border p-2'/>
                    </div>
                     <div>
                     <label htmlFor="EDate">End Date</label> <br />
                     <input type="date" className='outline-none border-2-black border p-2'/>
                     </div>
                </div>
                <div className='flex w-[60%] justify-between'>
                    <p>Want to receive daily digest about the campaign?</p>
                    <div>
                        <label className='switch'>
                            <input type="checkbox"/>
                            <span className='slider'></span>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="key" className='required'>Linked Keywords</label> <br />
                    <textarea name="" id="" placeholder='To add keywords, type your keyword and press enter' className='outline-none border border-gray-500 w-[60%] px-5 py-2 mt-2 rounded-md'></textarea>
                </div>
                <div>
                    <label htmlFor="text">Kindly select how often you want to receive daily digest</label> <br />
                    <select name="" id="" className='w-[300px] mt-2 p-1 outline-none border-2 px-2'>
                        <option value="select">Select</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className='flex gap-6'>
                    <Link to="/">
                    <button className='w-[300px] bg-red-700 text-white rounded-md'>Stop Campaign</button>
                    </Link>
                    <button className='w-[300px] text-[#247B7B] border-2 py-2  border-[#247B7B] rounded-md'>Edit Campaign</button>
                </div>
            </form>
          </div>
        </div>
      )
    }
  


export default UpdateList