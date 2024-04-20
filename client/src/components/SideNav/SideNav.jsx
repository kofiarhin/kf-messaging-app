import { Link, Routes, Route } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import { useState } from "react";
import Chats from "../Chats/Chats";
import "./sideNav.styles.scss";
const SideNav = () => {
  const [showChats, setShowChats] = useState(true);
  const [showContacts, setShowContacts] = useState(false);

  const handleShowChats = () => {
    setShowChats(true);
    setShowContacts(false);
  };

  const handleShowContacts = () => {
    setShowContacts(true);
    setShowChats(false);
  };
  return (
    <div id="sideNav">
      <div className="cta-wrapper">
        <button onClick={handleShowContacts}>Contacts</button>
        <button onClick={handleShowChats}>Chats</button>
      </div>
      {showContacts && <Contacts />}
      {showChats && <Chats />}
    </div>
  );
};

export default SideNav;
