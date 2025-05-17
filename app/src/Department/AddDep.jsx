import React, { useEffect, useState } from 'react'
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDepartment } from '../services/departmentSlice';
import { allEmployee } from '../services/employeeSlice';
const AddDep = ({ setShowModal }) => {
  const { employees, isLoading } = useSelector((state) => state.app)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setname] = useState('')
  const [manager, setmanager] = useState('')
  const handleSubmit = (e) => {
    const { access_token } = getToken();
    e.preventDefault();
    console.log("Manager Value:", manager);
    const managerValue = Number.isInteger(parseInt(manager)) ? parseInt(manager) : null;
    console.log("Selected manager:", managerValue);
    console.log("name:", name);
    console.log("manager:", managerValue);
    const formData = new FormData();
    formData.append("name", name)
    formData.append("manager", managerValue)
    dispatch(addDepartment(formData, access_token))
    navigate("/department")
  }

  useEffect(() => {
    dispatch(allEmployee());
  }, []);
  console.log("employees:", employees);
  return (
    <>
      <div className="flex  overflow-x-hidden  overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

        <div className="relative w-4/5 sm mx-auto bg-white my-10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Add Department</h3>
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

                  <label className='relative cursor-pointer  bg-white w-full'>
                    <select value={manager} name="manager" placeholder="Manager" onChange={e => setmanager(e.target.value)} className='h-12 w-full bg-white font-semibold   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' >
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Manager</span>
                      <option value="" disabled>Manager</option>
                      {employees && employees.map((emp) => (
                        <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                      ))}
                    </select>
                  </label>
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

export default AddDep
