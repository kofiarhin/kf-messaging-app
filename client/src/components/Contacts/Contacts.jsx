import ContactList from "../ContactList/ContactList";
import { useState, useEffect } from "react";
import "./contacts.styles.scss";
import {
  createContact,
  getContacts,
  reset as resetContactState,
} from "../../redux/contact/contactSlice";
import { useDispatch, useSelector } from "react-redux";

// contacts
const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, isSuccess } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const { email, username } = formData;
  const [showcontactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetContactState());
    }
  }, [isSuccess]);

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
      dispatch(createContact(dataToSubmit));
      setShowContactForm(false);
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
