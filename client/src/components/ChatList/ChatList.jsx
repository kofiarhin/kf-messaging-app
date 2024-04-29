import "./chatList.styles.scss";
import { setConversationId } from "../../redux/conversation/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import ChatItem from "./ChatItem/ChatItem";
import { socket } from "../../redux/socket/socketSlice";

const ChatList = ({ data }) => {
  return (
    <div id="chat-list">
      {data.map((item, index) => {
        const {
          _id,
          conversationId,
          messages,
          participant: { name },
          ...rest
        } = item;

        return <ChatItem key={index} data={item} />;
      })}
    </div>
  );
};

export default ChatList;
