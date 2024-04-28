
import { useEffect, useReducer } from "react";
import { socket } from "../../../redux/socket/socketSlice";
import { setConversationId} from "../../../redux/conversation/conversationSlice";
import { setNewMessage } from "../../../redux/message/messageSlice";
import {useDispatch } from "react-redux";
const ChatItem = ({ data }) => {
    const dispatch = useDispatch()
    const { _id, conversationId,  messages, participant: {name }, ...rest } = data;
    useEffect(() => {
        socket.emit("join", conversationId);
        socket.on("message", (data) => {
            dispatch(setNewMessage())
        })
    }, [socket])

    const sortMessages = (data) => {
        return  data[data.length -1].content
      }
  return (
          <div className="chat-unit"  onClick={() => dispatch(setConversationId(conversationId))} >  
                    <h2> {name} </h2>
                    <p> {sortMessages(messages) } </p>

             </div>
  )
}

export default ChatItem