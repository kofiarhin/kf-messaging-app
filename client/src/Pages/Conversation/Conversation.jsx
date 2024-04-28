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
  const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  const { currentConversationId }  = useSelector((state) => state.conversation)

  useEffect(() => {
    if (!user || isSuccess) {
      navigate("/login");
    }
  }, [user, isSuccess]);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login")
   
  };
  return (
    <div className="main-grid">
      <div className="users">
        <div className="side-nav">
          <SideNav />
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="messages">
         { currentConversationId && <>
          <div className="message-list">
          <MessageList />
        </div>
        <div className="input-wrapper">
          <InputForm />
        </div>
         </>}
      </div>
    </div>
  );
};

export default Conversation;
