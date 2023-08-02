import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../services/employeeSlice';
const DeleteEmp = ({ setDeleteModal, id }) => {
  const dispatch = useDispatch();



  return (
    <>
      <div className="flex  overflow-x-hidden h-auto overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

        <div className="relative w-4/5 sm mx-auto bg-white my-10">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold">Delete</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setDeleteModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="relative p-6 mt-4 flex-auto h-[200px]  overflow-auto">
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setDeleteModal(false)}
              >
                Close
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => { setDeleteModal(false); { dispatch(deleteEmployee(id)) } }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      )
    </>
  )
}

export default DeleteEmp
