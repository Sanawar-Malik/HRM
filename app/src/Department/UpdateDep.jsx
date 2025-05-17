import React, { useEffect, useState } from 'react'
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { updateDepartment } from '../services/departmentSlice';
const UpdateDep = ({ setUpdateModal, id }) => {
  const { employees, isLoading } = useSelector((state) => state.app)

  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [manager, setmanager] = useState('')
  const { access_token } = getToken();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${access_token}` };
        const response = await axios.get(`http://127.0.0.1:8000/api/dep/${id}/`, { headers });
        setname(response.data.name);
        setmanager(response.data.manager);
      };
      fetchData();
    }
  }, [id]);
  console.log("update id outside", id)
  const handleSubmit = (e) => {
    console.log("update ID", id)
    const { access_token } = getToken();
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    formData.append("manager", manager)

    console.log("formdata update", formData);
    for (let value of formData) {
      console.log(value);
    }
    dispatch(updateDepartment({ formData, access_token, id }));
    navigate("/department")

  }

  return (
    <>
      <div className="flex  overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-20 outline-none focus:outline-none">

        <div className="relative w-96 sm mx-auto bg-white my-10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Edit Department</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setUpdateModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative p-6 mt-12 flex-auto h-[500px] overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="name" id="name" value={name} onChange={e => setname(e.target.value)} placeholder="Name" className='h-12 w-full px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Name</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer  bg-white w-full'>
                    <select type="text" name="manager" value={manager} placeholder="Manager" onChange={e => setmanager(e.target.value)} className='h-12 w-full bg-white font-semibold px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required >
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Manager</span>
                      <option value="">Manager</option>
                      {employees && employees.map((emp) => (
                        <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                      ))}
                    </select>
                  </label>
                </div>


                <div className="relative flex  flex-col  justify-center">
                  <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default UpdateDep
