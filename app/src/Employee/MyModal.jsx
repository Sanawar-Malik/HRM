import React, { useState } from 'react'
import { getToken } from '../services/localStorage';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../services/employeeSlice';
const MyModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [server_error, setServerError] = useState({})
  const [file, setFilename] = useState('')
  const [image, setImage] = useState('')
  const [first_name, setfirst] = useState('')
  const [last_name, setlast] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [gender, setgender] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [degree, setDegree] = useState('')
  const [department, setDepartment] = useState('')
  const [date_of_birth, setdateofbirth] = useState('')
  const [password, setpassword] = useState('')
  const [password2, setpassword2] = useState('')
  const handleSubmit = (e) => {
    const { access_token } = getToken();
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image)
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("gender", gender)
    formData.append("password", password)
    formData.append("password2", password2)
    formData.append("email", email)
    formData.append("file", file)
    formData.append("date_of_birth", date_of_birth)
    formData.append("country", country)
    formData.append("city", city)
    formData.append("department", department)
    formData.append("degree", degree)
    dispatch(addEmployee(formData, access_token))


    const res = dispatch(addEmployee(formData, access_token));
    console.log(res)

    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      // storeToken(res.data.token)
      // navigate("/dashboard")
    }
  }

  return (
    <>
      <div className="flex  overflow-x-hidden h-[700px] overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

        <div className="relative w-4/5 sm mx-auto bg-white my-10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold">Add Employee</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setShowModal(false)}>
                <CloseIcon />
              </button>
            </div>
            {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
            <div className="relative p-6 mt-2 flex-auto h-[500px] overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="first_name" id="first_name" onChange={e => setfirst(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="last_name" id="last_name" onChange={e => setlast(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    {server_error.last_name ? <p className='text-sm text-red-400'>{server_error.last_name[0]}</p> : ""}
                  </div>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="email" name="email" id="email" onChange={e => setemail(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                  {server_error.email ? <p className='text-sm text-red-400'>{server_error.email[0]}</p> : ""}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="text" name="address" id="address" onChange={e => setaddress(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                  {server_error.address ? <p className='text-sm text-red-400'>{server_error.address[0]}</p> : ""}
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="phone" id="phone" onChange={e => setphone(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                    {server_error.phone ? <p className='text-sm text-red-400'>{server_error.phone[0]}</p> : ""}
                  </div>
                  <div className="relative z-0 mb-6 w-full group text-gray-500">
                    <select className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      type="text" id="gender" name="gender" placeholder="" onChange={e => setgender(e.target.value)}>
                      <label htmlfor="gender" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                      {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
                      <option>Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="country" id="country" onChange={e => setCountry(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="country" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                    {server_error.country ? <p className='text-sm text-red-400'>{server_error.country[0]}</p> : ""}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="city" id="city" onChange={e => setCity(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                    {server_error.city ? <p className='text-sm text-red-400'>{server_error.city[0]}</p> : ""}
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="degree" id="degree" onChange={e => setDegree(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="degree" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Degree</label>
                    {server_error.degree ? <p className='text-sm text-red-400'>{server_error.degree[0]}</p> : ""}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="department" id="department" onChange={e => setDepartment(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlfor="department" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                    {server_error.department ? <p className='text-sm text-red-400'>{server_error.department[0]}</p> : ""}
                  </div>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="text" name="date_of_birth" id="date_of_birth" onChange={e => setdateofbirth(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="date_of_birth" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DateBirth</label>
                  {server_error.date_of_birth ? <p className='text-sm text-red-400'>{server_error.date_of_birth[0]}</p> : ""}
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <input type="password" name="password" id="password" onChange={e => setpassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                  {server_error.password ? <p className='text-sm text-red-400'>{server_error.password[0]}</p> : ""}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="password" name="password2" id="password2" onChange={e => setpassword2(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="password2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                  {server_error.password2 ? <p className='text-sm text-red-400'>{server_error.password2[0]}</p> : ""}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="file" name="file" id="file" onChange={e => setFilename(e.target.files[0])} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="file" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Documents</label>
                  {server_error.file ? <p className='text-sm text-red-400'>{server_error.file[0]}</p> : ""}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlfor="image" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Documents</label>
                  {server_error.image ? <p className='text-sm text-red-400'>{server_error.image[0]}</p> : ""}
                </div>
                <div className="relative flex  flex-col  justify-center">
                  <button className="bg-blue-700 w-max mx-auto text-white font-semibold from-slate-50 to-blue-100 px-10 py-2 rounded-2xl shadow-blue-400 shadow-md border-b-4 hover border-b border-blue-200 hover:shadow-sm transition-all duration-500">Register</button>
                </div>
                {server_error.non_field_errors ? <Alert severity="error">This is an error alert — check it out!</Alert> : ""}

              </form>                  </div>
          </div>
        </div>
      </div>

      )
    </>
  )
}

export default MyModal
