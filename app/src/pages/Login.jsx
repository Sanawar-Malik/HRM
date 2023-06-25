import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginuser } from '../services/userDetailSlice';

const Login = () => {

  const [users, setUsers] = useState({});
  const dispatch = useDispatch()
  const getuserdata = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users...", users)
    dispatch(loginuser(users))
  }
  return (
    <>
      <div class="h-screen bg-gray-100 flex justify-center">
        <div class="py-6 px-8 h-75 mt-20 bg-white rounded shadow-xl">
          <form onSubmit={handleSubmit}>
            <div>
              <label for="email" class="block text-gray-800 font-bold">Email:</label>
              <input type="text" name="email" placeholder="@email" class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={getuserdata} />
            </div>
            <div class="mb-6">
              <label for="password" class="block text-gray-800 font-bold">Password:</label>
              <input type="text" name="password" placeholder="password" class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={getuserdata} />
            </div>
            <button class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
