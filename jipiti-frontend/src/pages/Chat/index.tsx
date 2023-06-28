import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import useMessages from "../../hooks/useMessages";
import useUser from "../../hooks/useUser";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Input from "../../components/Input";
import "./index.scss";

const Chat = () => {
  const { state } = useLocation();
  const { user, status: userStatus } = useUser(state.token);
  const { messages, status: messagesStatus, setMessages } = useMessages(user);
  const [answering, setAnswering] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => historyRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  const chat = messages && messages.length > 0
    ? messages.map(({ source, name, text }, idx) => <Message idx={idx} source={source} name={name} text={text} />)
    : <div className="empty-chat">Start your chat with Jipiti 🖖</div>;

  const loading = userStatus === "loading" || messagesStatus === "loading" ;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return <div className="chat-container col">
    <Header />
    <div className="chat-body">
        {loading ? <div className="empty-chat">Loading chat history...</div> : chat}
        {answering ? <Message idx={-1} source={"typing"} name={"Jipiti"} text={"is typing..."} /> : undefined}
        <div ref={historyRef} />
    </div>
    <Input user={user} messages={messages} setMessages={setMessages} setAnswering={setAnswering} />
  </div>
};

export default Chat;
