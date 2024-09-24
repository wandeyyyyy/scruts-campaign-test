import React, {useEffect, useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import '../App.css'
const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);  //
  const [error, setError] = useState(null); 
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign`);
        if (!res.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await res.json();
        console.log("Fetched data:", data)
        setCampaigns(data); 

        const activeCampaigns = data.filter(campaign => campaign.digestCampaign === "Yes");
        const inactiveCampaigns = data.filter(campaign => campaign.digestCampaign === "No");
      
        setActiveCount(activeCampaigns.length);
        setInactiveCount(inactiveCampaigns.length);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchList();
  }, []);
 

  
  return (
    <>
    <div className='ml-72 px-10'>
    <div className='font-extrabold text-[#247B7B] text-[24px]'>All Campaigns</div>
    <div className='flex justify-between mt-6'>
      <div className='flex gap-4'>
        <div className='border-2 border-[#247B7B] text-[#247B7B] px-10 py-1 rounded-md'>All({campaigns.length})</div>
        <div className='border-2 border-[#247B7B] text-[#247B7B] px-10 py-1 rounded-md'>Inactive({inactiveCount})</div>
        <div className='border-2 border-[#247B7B] text-[#247B7B] px-10 py-1 rounded-md'>Active({activeCount})</div>
      </div>
      <div className='flex gap-4'>
        <div className='flex items-center border-2 px-4 py-2'>
        <input type="text" placeholder='search...' className='outline-none'/>
        <FaSearch/>
        </div>
      
        <select>
          <option value="">Filter by date</option>
        </select>
      </div>
    </div>
    <div className="container mt-5">
          {error && <p className="text-red-500">Error: {error}</p>}  {/* Error handling */}

          <table className='table w-full'>
            <thead>
              <tr className='bg-[#F0F4F4] py-10 '>
                <th>S/N</th>
                <th>Campaign Name</th>
              
                <th>Start Date</th>
               <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign, index) => (
                  <tr key={campaign.id } className='py-4'>
                    <td className='text-center'>{index + 1}</td>
                    <td className='text-center'>{campaign.campaignName}</td>
             
                    <td className='text-center'>{campaign.startDate}</td>
                   
                    <td className={campaign.digestCampaign === "Yes" ? 'active-status' : 'inactive-status'}>
                      {campaign.digestCampaign === "Yes" ? 'Active' : 'Inactive'}
                    </td>

                    <td className='text-center'>
                      <div className='flex items-center justify-center gap-4'>
                        <button>
                        <img src="/images/mdi_eye-outline.png" alt="view" />
                        </button>
             <button>
             <img src="/images/lucide_edit.png" alt="" />
             </button>
                      <button>
                      <img src="/images/material-symbols_delete-outline-rounded.png" alt="delete" />
                      </button>
                       
                        
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No campaigns found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
</>
  )
}

export default Campaign