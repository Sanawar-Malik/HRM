import React from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { getToken } from '../services/localStorage';
import { useStateContext } from '../contexts/ContextProvider';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../featuers/authSlice';
import { removeToken } from '../services/localStorage';
import LockIcon from '@mui/icons-material/Lock';
const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }
  const { access_token } = getToken()
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center text-center gap-5 pl-2 pt-2 pb-2 rounded-lg text-bold text-white  text-md m-2 bg-black';
  const normalLink = 'flex items-center gap-5 pl-2 pt-2 pb-2 rounded-lg font-bold text-sm  text-black bg-gray-200 text-black hover:bg-light-gray m-2';

  return (
    <div className=" h-screen bg-black-500 border-2 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-inner">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span></span>
            </Link>
            <Tooltip content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>

          {access_token ? <div className="mt-10 ">

            <NavLink to="/dashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <GridViewOutlinedIcon />
              <span className="capitalize ">Dashboard</span>
            </NavLink>
            <NavLink to="/employee"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <GroupIcon />
              <span className="capitalize ">Employees</span>
            </NavLink>
            <NavLink to=""
              onClick={handleLogout}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <LockIcon />
              <span className="capitalize ">Logout</span>
            </NavLink>

          </div>
            : <div className="mt-10 ">
              <NavLink to="/login"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <LoginIcon />
                <span className="capitalize ">Sign in</span>
              </NavLink>   <NavLink to="/signup"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <LogoutIcon />
                <span className="capitalize ">Sign Up</span>
              </NavLink>
            </div>
          }

        </>
      )
      }
    </div >
  );
};

export default Sidebar;
