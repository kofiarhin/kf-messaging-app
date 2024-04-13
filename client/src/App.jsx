import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.styles.scss";
import { useEffect } from "react";

import Header from "./components/Header/Header";
// import { socket } from "./utils/helper";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
