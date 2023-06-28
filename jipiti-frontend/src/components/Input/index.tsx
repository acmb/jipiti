import send from "./send-icon.svg";
import "./index.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface InputProps {
  user: any;
  messages: any[] | undefined;
  setMessages: Dispatch<SetStateAction<any[] | undefined>>;
  setAnswering: Dispatch<SetStateAction<boolean>>;
}

const Message = ({ user, messages, setMessages, setAnswering }: InputProps) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | undefined>();
  const [error, setError] = useState(false);
  
  const isSubmitEnabled = message.trim() !== "";

  const onChange = (e: any) => {
    const type = e.nativeEvent.inputType;
    const value = e.target.value;

    if (type === "insertLineBreak") {
      onSubmit();
    } else if (!(type === "insertText" && value.trim() === "")) {
      setMessage(value);
    }
  };

  const onSubmit = () => {
    if (isSubmitEnabled) {
      setUserMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  const setUserMessage = (text: string) => {
    const newMessage = { source: "user", name: user?.name.split(" ")[0], text };
    setMessages([ ...(messages || []), newMessage ]);
    setAnswering(true);
  };

  const setAssistantMessage = (text: string) => {
    const newMessage = { source: "assistant", name: "Jipiti", text };
    setMessages([ ...(messages || []), newMessage ]);
    setAnswering(false);
  };

  const setErrorMessage = (text: string) => {
    const newMessage = { source: "error", name: "Error", text };
    setMessages([ ...(messages || []), newMessage ]);
    setAnswering(false);
  };

  const sendMessage = async (message: string) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message.trim() })
    };

    const response = await fetch(`http://localhost:8080/users/${user?._id}/messages`, options);

    if (response.ok) {
      const data = await response.json();
      setResponse(data.text);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (response) {
      setAssistantMessage(response);
      setResponse(undefined);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      setErrorMessage("Something went wrong. Please retry.");
      setError(false);
    }
  }, [error]);

  return (
    <div className="chat-input row">
      <div className="chat-input-text col">
        <textarea value={message} onChange={onChange}/>
      </div>
      <div className="chat-input-send col">
        <img
          src={send}
          className={`${isSubmitEnabled ? "enabled" : ""}`}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default Message;
