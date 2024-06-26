import "./contactList.styles.scss";
import { useDispatch } from "react-redux";
import { setConversationId } from "../../redux/conversation/conversationSlice";
import { useEffect } from "react";
import { getChatData } from "../../redux/chat/chatSlice";
const ContactList = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getChatData());
  }, [dispatch]);

  const handleConversationId = (id) => {
    dispatch(setConversationId(id));
  };

  return (
    <div id="contact-list">
      {data.length > 0
        ? data.map((item) => {
            const {
              _id: id,
              conversationId,
              userId: { name },
              ...rest
            } = item;
            return (
              <div
                key={id}
                onClick={() => handleConversationId(conversationId)}
                className="contact-unit"
              >
                <p>{name} </p>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ContactList;
