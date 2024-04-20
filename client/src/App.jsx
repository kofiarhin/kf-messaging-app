import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.styles.scss";
import { useEffect } from "react";

import Header from "./components/Header/Header";
import { socket } from "./utils/helper";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Conversation from "./Pages/Conversation/Conversation";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
