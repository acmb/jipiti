import useAuth from "../../hooks/useAuth";
import "./index.scss";

const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="chat-header row">
      <div className="chat-header-title col">Jipiti</div>
      <div className="chat-header-logout col" onClick={logout}>Logout</div>
    </div>
  );
};

export default Header;
