import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ChatList from "../ChatList/ChatList";
const Chats = () => {

  const { user, user: { conversations, _id } } = useSelector( state => state.auth);
  const { newMessage } = useSelector( state => state.message);
  const [conversationData, setConversationData] = useState([])
  
 useEffect(() => {

  const getConversations = async() => {
     try {
        const res = await Promise.all(conversations.map(async(c) => {
           const  userRes = await fetch(`/api/messages?conversationId=${c}`)
           if(userRes.ok) {
                const userData = await userRes.json()
                if(userData) { 
                  const { conversationId: { participants }, ...rest} = userData;

                  const indexOfUser = participants.indexOf(user._id)
                  const indexOfOtherUser = participants.length - 1 - indexOfUser;
                  const otherUserRes = await fetch(`/api/users/${participants[indexOfOtherUser]}`);
                    
                  if(otherUserRes.ok) {
                    const otherUserData = await otherUserRes.json()
                    
                    if(otherUserData) {

                      const dataToReturn = {
                        conversationId: c,
                        ...rest, 
                        participant: {
                          ...otherUserData
                        }
                      }

                      return dataToReturn;
                    }
                  }
                  
                } 
           }
        }))

        const filteredData =  res.filter( item => item != undefined)
        setConversationData(filteredData)
     } catch (error) {
       console.log(error)
     }
  }
  getConversations()
 }, [conversations, newMessage])
  return (
    <div>
        { conversationData.length > 0  && <ChatList data={conversationData} /> }
    </div>
  );
};

export default Chats;
