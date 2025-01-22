import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { connectionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [toUser, setToUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchToUser = async () => {
    try {
      const res = await axios.get(
        BACKEND_URL + `/findChatFriend/${connectionId}`,
        { withCredentials: true }
      );
      setToUser(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!toUser) fetchToUser();
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      fullName: user.firstName + " " + user.lastName,
      connectionId,
    });

    socket.on("messageReceived", ({ fullName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { fullName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, connectionId]);

  if (!toUser) return null;
  const { firstName, lastName, photoUrl } = toUser?.data?.data;

  const handleSendBtn = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      fullName: user.firstName + " " + user.lastName,
      connectionId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleEnterBtn = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendBtn();
    }
  };

  return (
    <div className="w-full max-w-4xl h-[70vh] border rounded-md border-gray-500 mx-auto m-5 flex flex-col bg-gray-900">
      {/* Header Section */}
      <div className="flex border-b items-center p-3 gap-3 bg-gray-800">
        <div className="w-12 h-12 rounded-full">
          <img
            alt="Profile Photo"
            src={photoUrl}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="font-bold text-lg text-white">
          {firstName + " " + lastName}
        </h1>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-800">
        {messages.map((msg, index) => (
          <div key={index} className="chat chat-start mb-3">
            <div className="chat-header flex items-center gap-2">
              <span className="font-bold">{msg.fullName}</span>
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble bg-gray-700 text-white p-3 rounded-lg">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-gray-600 flex items-center gap-2 bg-gray-800">
        <input
          onKeyDown={handleEnterBtn}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded p-2 bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendBtn}
          className="btn btn-secondary px-5 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
