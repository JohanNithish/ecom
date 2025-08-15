import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // fixed import
import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const apiUrl = import.meta.env.VITE_API_ADMIN;

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsAuth(false);
        setAuthChecked(true);
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setIsAuth(true);
          setAuthChecked(true);
          return;
        }

        // Access token expired → try to refresh using HttpOnly cookie
        try {
          const res = await axios.post(
            `${apiUrl}/refresh-token`,
            {},
            { withCredentials: true } // ✅ send cookie
          );
          localStorage.setItem("accessToken", res.data.accessToken);
          setIsAuth(true);
        } catch (refreshErr) {
          console.error("Refresh token failed:", refreshErr);
          localStorage.removeItem("accessToken");
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Invalid token format:", err);
        localStorage.removeItem("accessToken");
        setIsAuth(false);
      }

      setAuthChecked(true);
    };

    verifyToken();
  }, [apiUrl]);

  if (!authChecked) {
    return <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>; // loader placeholder
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
