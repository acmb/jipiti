import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    const login = () => {    
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            setUserId(userId);
            navigate("/chat", { replace: true, state: { token } });
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUserId(null);
        navigate("/login", { replace: true });
    };

    return { userId, login, logout };
};

export default useAuth;
