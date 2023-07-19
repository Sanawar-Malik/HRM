import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
//import Button from '@mui/material/Button'
import { Navbar, Sidebar, Home } from './components';
import { Employee, Login, Signup, Dashboard } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
const App = () => {
  const { access_token } = useSelector(state => state.auth)
  const { activeMenu } = useStateContext();

  //useEffect(() => {
  //const currentThemeColor = localStorage.getItem('colorMode');
  // const currentThemeMode = localStorage.getItem('themeMode');
  // if (currentThemeColor && currentThemeMode) {
  // setCurrentColor(currentThemeColor);
  //  setCurrentMode(currentThemeMode);
  // }
  // }, []);

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">

          {activeMenu ? (
            <div className="w-48 fixed sidebar dark:bg-secondary-dark-bg bg-white "><Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">

              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-white min-h-screen md:ml-48 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>

              <Routes>
                <Route exact path="/" element={<Home />}>
                </Route>
                <Route exact path="/employee" element={<Employee />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path='/login' element={!access_token ? <Login /> : <Navigate to='/dashboard' />} />
                <Route exact path='/dashboard' element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter >
    </div >
  );
};

export default App;
