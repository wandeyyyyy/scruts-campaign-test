import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const CreateList = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    digestCampaign: true,
    linkedKeywords: [],
    dailyDigest: ""
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        linkedKeywords: [...formData.linkedKeywords, e.target.value.trim()]
      });
      e.target.value = '';
    }
  }

  const removeKeyword = (index) => {
    const updatedKeywords = formData.linkedKeywords.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      linkedKeywords: updatedKeywords
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!formData.campaignName || !formData.campaignDescription || !formData.startDate || !formData.endDate || !formData.dailyDigest) {
      Swal.fire({
        icon: 'error',
        text: 'All fields are required!',
      });
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: 'End date must be after the start date.',
      });
      return;
    }

    setLoading(true); 

    try {
      const res = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data === false) {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'There was an error submitting the campaign.',
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: 'Your campaign has been successfully created.',
          confirmButtonText: 'Go Back to Campaign List',
          confirmButtonColor: '#247B7B',
        }).then((success) => {
          if (success.isConfirmed) {
            setFormData({
              campaignName: '',
              campaignDescription: '',
              startDate: '',
              endDate: '',
              digestCampaign: true,
              linkedKeywords: [],
              dailyDigest: '',
            });
            navigate('/campaignlist');
          }
        });
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='md:ml-72 '>
      <div>
       
        <h1 className='font-extrabold text-[#247B7B] text-[24px]'>Create New Campaign</h1>
        <form onSubmit={handleSubmitForm} className='mt-10 flex flex-col gap-6'>
            <div>
                <label htmlFor="name" className='required'>Campaign Name</label> <br />
                <input type="text" name="name" id="campaignName" placeholder='e.g The future is now' className='outline-none border border-gray-500 md:w-[60%] w-[90%] px-5 py-2 mt-2 rounded-md' value={formData.campaignName}  onChange={handleChanges} />
            </div>
            <div>
                <label htmlFor="describe" >Campaign Description</label> <br />
              <textarea name="describe" id="campaignDescription" placeholder='Please add a description to your campaign'  className='outline-none border border-gray-500 md:w-[60%] w-[90%] px-5 py-2 mt-2 rounded-md' value={formData.campaignDescription} onChange={handleChanges}>

              </textarea>
            </div>
            <div className='flex flex-col md:flex-row md:w-[60%] w-[90%] md:justify-between'>
                <div>
                <label htmlFor="SDate" className='required'>Start Date</label> <br />
                <input type="date" id='startDate' value={formData.startDate} className='outline-none border-2-black border p-2'  onChange={handleChanges}/>
                </div>
                 <div>
                 <label htmlFor="EDate">End Date</label> <br />
                 <input type="date" id='endDate' value={formData.endDate} className='outline-none border-2-black border p-2'  onChange={handleChanges}/>
                 </div>
            </div>
            <div className='flex md:w-[60%] w-[90%] justify-between'>
                <p>Want to receive daily digest about the campaign?</p>
                <div>
                    <label className='switch'>
                        <input type="checkbox" id='digestCampaign' onChange={handleChanges} checked={formData.digestCampaign}/>
                        <span className='slider'></span>
                    </label>
                </div>
            </div>
            <div>
            <label htmlFor='key' className='required'>Linked Keywords</label> <br />
            <div className='border border-gray-500 md:w-[60%] w-[90%] px-4 rounded-md'>
            <input type='text' id='linkedKeywordsInput' placeholder='To add keywords, type your keyword and press enter' className='outline-none md:w-[60%] w-[90%] px-5 py-2 mt-2 rounded-md' onKeyDown={handleKeyDown}
             />
            <div className='mt-2'>
              {formData.linkedKeywords.length > 0 && (
                <ul className='list-disc'>
                  {formData.linkedKeywords.map((keyword, index) => (
                    <li key={index} className='inline-flex items-center gap-2 mr-2 mb-1'>
                      <span className='bg-[#247B7B] text-white px-3 py-1 rounded font-bold'>
                        {keyword}
                        <button type='button' onClick={() => removeKeyword(index)} className='text-red-500 ml-8'>x</button>
                      </span>
                     
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          </div>
            <div>
                <label htmlFor="text">Kindly select how often you want to receive daily digest</label> <br />
                <select name="" id="dailyDigest" className='w-[300px] mt-2 p-1 outline-none border-2 px-2' value={formData.dailyDigest}  onChange={handleChanges} >
                    <option value="">Select</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className='flex flex-col md:flex-row gap-6'>
            <Link to={'/'}>
              <button className='w-[300px] text-[#247B7B] border-2 py-2 border-[#247B7B] rounded-md'>Cancel</button>
            </Link>
            <button 
              type="submit" 
              className='w-[300px] text-white bg-[#247B7B] py-2 rounded-md'
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
      }
   
export default CreateList;