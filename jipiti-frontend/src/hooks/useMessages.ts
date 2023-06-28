import { useEffect, useState } from "react";

const useMessages = (user: any) => {
    const [status, setStatus] = useState('idle');
    const [messages, setMessages] = useState<any[] | undefined>(undefined);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setStatus('loading');

            try {
                const data = await fetch(`http://localhost:8080/users/${user._id}/messages`);
                const json = await data.json() as any[];
                setMessages(json.map((message) => ({
                    ...message,
                    name: message.source === "user" ? user.name.split(" ")[0] : "Jipiti"
                })));
            } catch (error: any) {
                setStatus('error');
            }

            setStatus('success');
        };

        fetchData();
    }, [user]);

    return { status, messages, setMessages };
}

export default useMessages;
