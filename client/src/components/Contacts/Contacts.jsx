import ContactList from "../ContactList/ContactList";
import { useState } from "react";
import "./contacts.styles.scss";

const Contacts = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [showcontactForm, setShowContactForm] = useState(false);
  const { email, username } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleShowContactForm = () => {
    setShowContactForm(true);
  };

  const haneleBack = () => {
    setShowContactForm(false);
  };
  return (
    <div id="contacts">
      <>
        {" "}
        {!showcontactForm ? (
          <button onClick={handleShowContactForm}> New Contact</button>
        ) : (
          <button onClick={haneleBack}>Go Back</button>
        )}{" "}
      </>

      {showcontactForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter Username"
          />
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      ) : (
        <ContactList />
      )}
    </div>
  );
};

export default Contacts;
