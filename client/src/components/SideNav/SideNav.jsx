import { Link, Routes, Route } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setShowContacts, setShowChats } from "../../redux/navigation/navigationSlice";
import Chats from "../Chats/Chats";
import "./sideNav.styles.scss";
const SideNav = () => {
  const dispatch = useDispatch()
  const { showChats, showContacts}  = useSelector( state => state.navigation)

  const handleShowChats = () => {
    dispatch(setShowChats())
  };

  const handleShowContacts = () => {
     dispatch(setShowContacts())
  };
  return (
    <div id="sideNav">
      <div className="cta-wrapper">
        <button onClick={handleShowChats}>Chats</button>
        <button onClick={handleShowContacts}>Contacts</button>
      </div>
      {showChats && <Chats />}
      {showContacts && <Contacts />}
    </div>
  );
};

export default SideNav;
