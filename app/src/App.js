import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
//import Button from '@mui/material/Button'
import PrivateRoute from './utils/PrivateRoute'
import { Navbar, Footer, Sidebar, Home } from './components';
import { Employee, Login } from './pages';
import { useStateContext } from './contexts/ContextProvider';
const App = () => {

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
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <Tooltip
              content="Settings"
              position="Top"
            >
              <FiSettings />





            </Tooltip>
          </div>
          {activeMenu ? (
            <div className="w-40 fixed sidebar dark:bg-secondary-dark-bg bg-black ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>

              <Routes>
                <PrivateRoute exact path="/" element={<Home />} />
                <Route exact path="/employee" element={<Employee />} />
                <Route exact path="/login" element={<Login />} />




              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
