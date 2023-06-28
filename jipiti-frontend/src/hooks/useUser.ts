import { useEffect, useState } from "react";

const useUser = (token?: string) => {
    const [status, setStatus] = useState('idle');
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                setStatus('loading');
    
                try {
                    const data = await fetch(`http://localhost:8080/users/${token}`);
                    setUser(await data.json());
                } catch (error: any) {
                    setStatus('error');
                }
    
                setStatus('success');
            };
    
            fetchData();
        };
    }, []);

    return { user, status };
}

export default useUser;
