import "./index.scss";

interface MessageProps {
  idx: number;
  source: "user" | "assistant" | "typing" | "error";
  name: string;
  text: string;
}

const Message = ({ idx, source, name, text }: MessageProps) => (
  <div key={idx} className={`text-block ${source}-block`}>
    <p className="text-block-name">{name}</p>
    <p className="text-block-text">{text}</p>
  </div>
);

export default Message;
