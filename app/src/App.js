import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Home } from './components';
import { Employee, Login, Signup, Dashboard } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
const App = () => {
  const { access_token } = useSelector(state => state.auth)
  const { activeMenu } = useStateContext();

  return (
    <>
      <BrowserRouter>
        <div className="flex relative">

          {activeMenu ? (
            <div className="w-48 fixed sidebar bg-white "><Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">

              <Sidebar />
            </div>
          )}
          <div className="bg-gradient-to-r from-fuchsia-50 via-gray-50 to-slate-100 to-stone-50 min-h-screen md:ml-48 w-full " >
            <div className="fixed md:static navbar w-full ">
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
    </ >
  );
};
export default App;
