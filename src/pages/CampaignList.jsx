import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import '../App.css';

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(10); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign`);
        if (!res.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        
        const data = await res.json();
        setCampaigns(data);
        setFilteredCampaigns(data);
        
      
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

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // 
    if (filter === 'all') {
      setFilteredCampaigns(campaigns);
    } else if (filter === 'active') {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.digestCampaign === "Yes"));
    } else if (filter === 'inactive') {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.digestCampaign === "No"));
    }
  };


  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deletebtn = (id) => {
    Swal.fire({
      title: 'Are you sure You Want to Delete?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete Campaign'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`An error occurred: ${response.status} - ${response.statusText}`);
            }
            Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
            navigate("/campaignlist");
          })
          .catch((error) => {
            console.error('Delete error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Deletion Error',
              text: 'Failed to delete the campaign. Please try again.',
            });
          });
      }
    });
  };

  // for the Pagination UI
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCampaigns.length / campaignsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className='md:ml-72 px-10'>
        <div className='font-extrabold text-[#247B7B] text-[24px]'>All Campaigns</div>
        <div className='md:flex md:justify-between md:items-center mt-6 w-[85%]'>
          <div className='flex gap-4 flex-col lg:flex-row w-full'>
         <button
              className={`border-2 shadow-xl border-[#247B7B] w-[80px] md:w-[150px] text-[#247B7B] py-1 rounded-md ${currentFilter === 'all' ? 'bg-[#247B7B] text-white' : ''}`}
              onClick={() => handleFilter('all')}
            >
              All ({campaigns.length})
         </button>
          <button
              className={`border-2 shadow-xl border-[#247B7B] w-[120px] md:w-[150px] text-[#247B7B] py-1 rounded-md ${currentFilter === 'inactive' ? 'bg-[#247B7B] text-white' : ''}`}
              onClick={() => handleFilter('inactive')}
            >
              Inactive ({inactiveCount})
          </button>
          <button
              className={`border-2 shadow-xl border-[#247B7B] w-[120px] md:w-[150px] text-[#247B7B] py-1 rounded-md ${currentFilter === 'active' ? 'bg-[#247B7B] text-white' : ''}`}
              onClick={() => handleFilter('active')}
            >
              Active ({activeCount})
           </button>
          </div>
        </div>

        <div className="container mt-5">
          {error && <p className="text-red-500">Error: {error}</p>}

          <table className='table table-container w-full'>
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
              {currentCampaigns.length > 0 ? (
                currentCampaigns.map((campaign, index) => (
                  <tr key={campaign.id} className='py-4'>
                    <td className='text-center'>{indexOfFirstCampaign + index + 1}</td>
                    <td className='text-center'>{campaign.campaignName}</td>
                    <td className='text-center'>{campaign.startDate}</td>
                    <td className={campaign.digestCampaign === "Yes" ? 'active-status' : 'inactive-status'}>
                      {campaign.digestCampaign === "Yes" ? 'Active' : 'Inactive'}
                    </td>
                    <td className='text-center'>
                      <div className='flex items-center justify-center gap-4'>
                        <button>
                          <FaEye />
                        </button>
                        <Link to={`/update-list/${campaign.id}`}>
                          <FaEdit />
                        </Link>
                        <button onClick={() => deletebtn(campaign.id)}>
                          <MdDelete color='red' />
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

    {/* pagination control */}
          <div className="pagination mt-4">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border ${currentPage === number ? 'bg-[#247B7B] text-white' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Campaign;
