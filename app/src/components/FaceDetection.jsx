import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';  // Make sure you have axios installed
import { setEmployeeId } from '../services/attendanceSlice';
import { getToken } from '../services/localStorage';

function FacialRecognition() {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);


  const handleImageUpload = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const captureScreenshot = async () => {
    const formData = new FormData();
    formData.append('screenshot', screenshot);
    const { access_token } = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    // Send the screenshot to the Django backend
    try {
      await axios.post('http://127.0.0.1:8000/api/attendance/', formData, config);
      console.log('Attendance marked successfully.');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };
  return (
    <>
      <div>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <button onClick={captureScreenshot}>Mark Attendance</button>
    </>);
}




export default FacialRecognition;

