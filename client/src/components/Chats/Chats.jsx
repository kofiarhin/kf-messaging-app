import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ChatList from "../ChatList/ChatList";
import { getChatData } from "../../redux/chat/chatSlice";
const Chats = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.chat);

  console.log(data);
  const {
    user,
    user: { conversations, _id },
  } = useSelector((state) => state.auth);
  const { newMessage } = useSelector((state) => state.message);
  const [conversationData, setConversationData] = useState([]);

  useEffect(() => {
    dispatch(getChatData());
  }, [conversations, newMessage]);
  return <div>{data.length > 0 && <ChatList data={data} />}</div>;
};

export default Chats;
