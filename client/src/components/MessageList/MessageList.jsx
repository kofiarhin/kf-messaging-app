import "./messageList.styles.scss"
import {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { getMessages, resetNewMessage } from "../../redux/message/messageSlice";
const MessageList = () => {
  const dispatch = useDispatch();
  const { currentConversationId } = useSelector( state => state.conversation);
  const { user } = useSelector(state => state.auth)
  // const [ messages, setMessages] = useState([]);
  // const [ participantData, setParticipantData ] =  useState(null)

  const { messages, participant, newMessage } = useSelector(state => state.message)

  useEffect(() => {  
    dispatch(getMessages())
    if(newMessage) {
      dispatch(resetNewMessage())
    }
  }, [currentConversationId, dispatch, newMessage])




  return (
    <div id="message-list">
      
      {messages.length > 0 && <>
        <h1 className="heading center"> {participant.name} </h1>
          {messages.map( (message, index) => {
            return <div key={index} className="message-unit">
              <p>  {message.content} </p>
            </div>
          })}
      </>}
    </div>
  );
};

export default MessageList;
