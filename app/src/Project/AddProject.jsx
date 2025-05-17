import React, { useEffect, useState } from 'react'
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allEmployee } from '../services/employeeSlice';
import Multiselect from 'multiselect-react-dropdown';
import { addProject } from '../services/projectSlice';
import Select from 'react-select'
import axios from 'axios';

const AddProject = ({ setShowModal }) => {
  const { employees, isLoading } = useSelector((state) => state.app)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setname] = useState('')
  const [manager, setmanager] = useState('')
  const [description, setdescription] = useState('')
  const [members, setmembers] = useState([])
  const [created_at, setcreated_at] = useState('')
  const [end_at, setend_at] = useState('')
  const [option, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("option", option)

  const handleSubmit = (e) => {
    const { access_token } = getToken();
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    formData.append("manager", manager)
    formData.append("members", members)
    formData.append("description", description)
    formData.append("created_at", created_at)
    formData.append("end_at", end_at)

    dispatch(addProject(formData, access_token))
    navigate("/project")
  }
  const { access_token } = getToken();
  const fetched = async () => {
    const headers = { 'Authorization': `Bearer ${access_token}` };

    const response = await axios.get('http://127.0.0.1:8000/api/emp/', { headers });
    const data = response.data;
    if (Array.isArray(data)) {
      console.log('API response:', data);
      setOptions(data);
    } else {
      throw new Error('Invalid API response format');
    }


    console.log("project option", data);
    // const optionsData = data.map(item => ({
    //   value: item.id,
    //   label: item.first_name
    // }));
  };

  useEffect(() => {
    fetched()
    dispatch(allEmployee());
  }, []);
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(event.target.members, (emp) => emp.value)
    console.log("hello my dear error why are you iterarate me", selectedValues)
    setmembers(selectedValues);
  };

  return (
    <>
      <div className="flex  overflow-x-hidden  overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

        <div className="relative w-4/5 sm mx-auto bg-white my-10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Add Project</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setShowModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative p-6 mt-12 flex-auto h-[500px] overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="name" id="name" onChange={e => setname(e.target.value)} placeholder="Name" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Name</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="description" id="description" onChange={e => setdescription(e.target.value)} placeholder="Name" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Description</span>
                  </label>
                </div>

                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="date" name="created_at" id="created_at" onChange={e => setcreated_at(e.target.value)} placeholder="Started-Date" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Started-Date</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="date" name="end_at" id="end_at" onChange={e => setend_at(e.target.value)} placeholder="Finished-Date" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Finished-Date</span>
                    </label>
                  </div>
                </div>
                <div class="mb-8">
                  <label class="block text-fuchsia-700 text-opacity-80 text-sm font-bold ml-6">
                    Manager
                  </label>
                  <select value={manager} name="manager" placeholder="Manager" onChange={e => setmanager(e.target.value)} className='h-12 w-full bg-white font-semibold   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required >
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Manager</span>

                    {employees && employees.map((emp) => (
                      <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                    ))}
                  </select>

                </div>
                <div class="mb-8">
                  <label class="block text-fuchsia-700 text-opacity-80 text-sm font-bold ml-6">
                    Members
                  </label>
                  <select multiple value={members} name="members" placeholder="Members" onChange={handleSelectChange} >
                    {option.map((emp) => (
                      <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                    ))}
                  </select>

                </div>


                <div className="relative flex  flex-col  justify-center">
                  <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

      )
    </>
  )
}

export default AddProject
