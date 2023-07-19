import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../services/userAuthApi';
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../services/localStorage'
import Alert from '@mui/material/Alert';
import { setUserToken } from '../featuers/authSlice';
const Login = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),

    }
    const res = await loginUser(actualData)
    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate("/dashboard")
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])
  return (
    <>
      {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}


      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
        <form onSubmit={handleSubmit}>

          <div className="relative z-0 mb-6 w-full group">
            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {server_error.email ? <p className='text-sm text-red-400'>{server_error.email[0]}</p> : ""}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {server_error.password ? <p className='text-sm text-red-400'>{server_error.password[0]}</p> : ""}
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ""}
        </form>


      </div>

    </>
  )
}

export default Login
