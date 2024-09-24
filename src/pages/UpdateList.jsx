import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id,
    campaignName: "",
    campaignDescription: "",
    digestCampaign: "No",
    startDate: "",
    endDate: "",
    linkedKeywords: [],
    dailyDigest: "Daily",
    campaignStatus: true
  });
  
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetch(`https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      });
  }, [id]);

  const handleChanges = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevEditCampaign) => ({
      ...prevEditCampaign,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      setFormData(prevData => ({
        ...prevData,
        linkedKeywords: [...prevData.linkedKeywords, e.target.value.trim()]
      }));
      e.target.value = ''; 
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = formData.linkedKeywords.filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      linkedKeywords: updatedKeywords
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      id: id,
      campaignName: formData.campaignName,
      campaignDescription: formData.campaignDescription,
      digestCampaign: formData.digestCampaign === "Yes",
      startDate: formData.startDate,
      endDate: formData.endDate,
      linkedKeywords: formData.linkedKeywords,
      dailyDigest: formData.dailyDigest,
    };

    setLoading(true);

    fetch(`https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `An error occurred... status: ${response.status}, body: ${response.statusText}`
          );
        }
        return response;
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully!',
          text: 'The campaign has been updated.',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/campaignlist");
        });
      })
      .catch((error) => {
        console.error("Submit error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update the campaign. Please try again.',
        });
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const deletebtn = () => {
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
          Swal.fire(
            'Deleted!',
            'Your campaign has been deleted.',
            'success'
          );
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

  return (
    <div className='md:ml-72'>
      <div className='px-10'>
        <div className='flex justify-between items-center'>
          <h1 className='font-extrabold text-[#247B7B] text-[24px]'>Campaign Information</h1>
          <div className='flex bg-[#EDF0F0] rounded-md text-[10px] md:text-[16px]'>
            <div className='border-e-2 border px-4 py-2'>Campaign Status</div>
            <div className={`px-4 py-2 font-semibold ${formData.campaignStatus ? 'text-green-600' : 'text-red-600'}`}>
              {formData.campaignStatus ? 'Active' : 'Inactive'}
            </div>
          </div> 
        </div>

        <form className='mt-10 flex flex-col gap-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="campaignName" className='required'>Campaign Name</label> <br />
            <input type="text"
              id="campaignName"
              name="campaignName"
              placeholder='e.g The future is now'
              className='outline-none border border-gray-500 w-[80%] md:w-[60%] px-5 py-2 mt-2 rounded-md'
              value={formData.campaignName} onChange={handleChanges} />
          </div>
          <div>
            <label htmlFor="campaignDescription">Campaign Description</label> <br />
            <textarea
              id="campaignDescription"
              name="campaignDescription"
              value={formData.campaignDescription}
              className='outline-none border border-gray-500 w-[80%] md:w-[60%] px-5 py-2 mt-2 rounded-md'
              onChange={handleChanges}
            />
          </div>
          <div className='md:flex w-[80%] md:w-[60%] justify-between'>
            <div>
              <label htmlFor="startDate" className='required'>Start Date</label> <br />
              <input type="date" name='startDate' id='startDate' value={formData.startDate} className='outline-none border-2-black border p-2' onChange={handleChanges} />
            </div>
            <div>
              <label htmlFor="endDate">End Date</label> <br />
              <input type="date" id='endDate' name='endDate'
                value={formData.endDate} className='outline-none border-2-black border p-2' onChange={handleChanges} />
            </div>
          </div>
          <div className=' w-full '>
            <p>Want to receive daily digest about the campaign?</p> <br />
            <div>
              <select id='digestCampaign'
                name='digestCampaign'
                onChange={handleChanges}
                className='w-[80%] md:w-[60%] p-2 bg-gray-200 outline-none' 
                value={formData.digestCampaign}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor='linkedKeywordsInput' className='required'>Linked Keywords</label> <br />
            <div className='border border-gray-500 w-[80%] md:w-[60%] px-4 rounded-md'>
              <input type='text' id='linkedKeywordsInput' placeholder='To add keywords, type your keyword and press enter' className='outline-none w-[80%] md:w-[60%] px-5 py-2 mt-2 rounded-md' onKeyDown={handleKeyDown} />
              <div className='mt-2'>
                {formData.linkedKeywords.length > 0 && (
                  <ul className='list-disc'>
                    {formData.linkedKeywords.map((keyword, index) => (
                      <li key={index} className='inline-flex items-center gap-2 mr-2 mb-1'>
                        <span className='bg-[#247B7B] text-white px-3 py-1 rounded font-bold'>
                          {keyword}
                          <button type='button' onClick={() => removeKeyword(index)} className='text-white ml-8'>x</button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="dailyDigest">Kindly select how often you want to receive daily digest</label> <br />
            <select id="dailyDigest" className='w-[80%] md:w-[60%] mt-2 p-1 outline-none border-2 px-2' value={formData.dailyDigest} onChange={handleChanges}>
              <option value="">Select</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-6'>
            <button type='button' onClick={deletebtn} className='w-[300px] text-white font-bold bg-red-700 border-2 py-2 rounded-md'>Stop Campaign</button>
            <button type='submit' className='w-[300px] text-[#247B7B] font-bold font-bold border-2 border-[#247B7B] py-2 rounded-md' disabled={loading}>
              {loading ? 'Saving Changes...' : 'Edit Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateList;
