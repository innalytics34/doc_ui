import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Cookies from "js-cookie";

const App = () => {
  const isLogin = Cookies.get('Islogin') === 'true';
  // const isLogin = 'true';
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); 
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogin ? <Navigate to="/dashboard" /> : <LoginForm />} />
        <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
