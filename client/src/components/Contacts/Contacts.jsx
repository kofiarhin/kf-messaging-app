import ContactList from "../ContactList/ContactList";
import { useState, useEffect } from "react";
import "./contacts.styles.scss";

const Contacts = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const { email, username } = formData;
  const [showcontactForm, setShowContactForm] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch("/api/contacts");
        const data = await res.json();

        setContacts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getContacts();
  }, []);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      username,
    };

    try {
      const res = await fetch("/api/contacts", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dataToSubmit),
      });
      const data = await res.json();
      setContacts(data);
      if (res.ok) {
        setShowContactForm(false);
      }
    } catch (error) {
      console.log(error.message);
    }
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
        <ContactList data={contacts} />
      )}
    </div>
  );
};

export default Contacts;
