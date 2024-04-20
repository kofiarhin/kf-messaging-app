import "./conversation.styles.scss";
import UserList from "../../components/UserLIst/UserList";
import MessageList from "../../components/MessageList/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, reset } from "../../redux/user/userSlice";
import SideNav from "../../components/SideNav/SideNav";
import InputForm from "../../components/InputForm/InputForm";

const Conversation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
  };
  return (
    <div className="main-grid">
      <div className="users">
        <div className="side-nav">
          <SideNav />
        </div>
        <button onClick={handleLogout}>New Conversation</button>
      </div>
      <div className="messages">
        <div className="message-list">
          <MessageList />
        </div>
        <div className="input-wrapper">
          <InputForm />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
