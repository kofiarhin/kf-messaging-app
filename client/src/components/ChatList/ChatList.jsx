import "./chatList.styles.scss"; 
import { setConversationId } from "../../redux/conversation/conversationSlice";
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from "./ChatItem/ChatItem";
import { socket } from "../../redux/socket/socketSlice";


const ChatList = ({ data}) => {
    const dispatch = useDispatch()


    // sort data by data created;

    const sortMessages = (data) => {
      return  data[data.length -1].content
    }
  return (
    <div id="chat-list"> 
        
        { data.map( (item, index) => {

            const { _id, conversationId,  messages, participant: {name }, ...rest } = item;

            return <ChatItem key={index} data={item} />
            //     {/* <div className="chat-unit" key={_id} onClick={() => dispatch(setConversationId(conversationId))} >  
            //         <h2> {name} </h2>
            //         <p> {sortMessages(messages) } </p>

            //  </div> */}
           
        })}

    </div>
  )
}

export default ChatList