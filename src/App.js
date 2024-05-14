import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Cookies from "js-cookie";

const App = () => {
  const Islogin = Cookies.get('Islogin');

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
        <Route path="/" element={<LoginForm />} />
        {Islogin === 'true' && <Route path="/Dashboard" element={<Dashboard />} />}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
