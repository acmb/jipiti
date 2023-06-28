import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import "./index.scss";

const Login = () => {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
        login_uri: "http://localhost:8080/auth/login",
        ux_mode: "redirect"
      });
      google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_blue',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
      });
    }
  }, []);

  return <div className="login col">
    <h1>Welcome to Jipiti</h1>
    <div ref={divRef}></div>
  </div>
};

export default Login;
