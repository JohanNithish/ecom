import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { SideBar } from '../comp/SideBar';
import '../App.css';
import Home from './Home';
import Login from './Login';
import Error404 from '../pages/Error404';
import AddUser from './AddUser';
import ListUser from './ListUser';
import ProtectedRoute from './ProtectedRoute';
function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsopen] = useState(false);
  const ToggleSidebar = () => {
    setIsopen(prev => !prev);
  };
  
const isLoginPage = location.pathname === "/admin/login";

  return (
    <>
    <div className={`main-body ${isOpen == true ? 'small-bar' : ''}`}>
      {isLoginPage ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        ) : (
        <ProtectedRoute>
          <>
          <SideBar isOpen={isOpen} ToggleSidebar={ToggleSidebar} />
          <div className="page-section">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/listuser" element={<ListUser />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
          </>
        </ProtectedRoute>
         )
      }
      </div>
    </>
  );
}
export default AdminPage