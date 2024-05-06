import { useState, useEffect } from "react";
import "./inputForm.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { setNewMessage } from "../../redux/message/messageSlice";
import { socket } from "../../redux/socket/socketSlice";
import { setShowChats } from "../../redux/navigation/navigationSlice";
// input form
const InputForm = () => {
  const dispatch = useDispatch();
  const { currentConversationId } = useSelector((state) => state.conversation);
  const { showChats, showContacts } = useSelector((state) => state.navigation);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("join", currentConversationId);
    socket.on("message", (data) => {
      dispatch(setNewMessage());
    });
  }, [socket]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      conversationId: currentConversationId,
      senderId: user._id,
      content: message,
    };

    try {
      const res = await fetch("/api/messages", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dataToSubmit),
      });
      const data = await res.json();

      setMessage("");
      if (!showChats) {
        dispatch(setShowChats());
      }
      // dispatch new message
      socket.emit("new_message", { id: currentConversationId, dataToSubmit });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="type message here..."
          onChange={handleChange}
          value={message}
        />
      </form>
    </>
  );
};

export default InputForm;
