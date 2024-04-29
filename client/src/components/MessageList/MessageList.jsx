import "./messageList.styles.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, resetNewMessage } from "../../redux/message/messageSlice";
import { getParticipant } from "../../redux/conversation/conversationSlice";
const MessageList = () => {
  const dispatch = useDispatch();
  const { currentConversationId } = useSelector((state) => state.conversation);
  const { user } = useSelector((state) => state.auth);
  const { participant } = useSelector((state) => state.conversation);

  const [sortedData, setSortedData] = useState([]);

  const { messages, newMessage } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getParticipant(currentConversationId));
    dispatch(getMessages());
    if (newMessage) {
      dispatch(resetNewMessage());
    }
  }, [currentConversationId, dispatch, newMessage]);

  return (
    <div id="message-list">
      {participant && <h1 className="heading center"> {participant.name} </h1>}
      {messages.length > 0 && (
        <>
          {messages.map((message, index) => {
            return (
              <div key={index} className="message-unit">
                <p> {message.content} </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MessageList;
