import fetch from "node-fetch";
import Log from "../../model/log";
import { Message } from "../../types";
import "dotenv/config";

interface GPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
       prompt_tokens: number;
       completion_tokens: number;
       total_tokens: number;
    },
    choices: {
        message:{
            role: "user" | "assistant";
            content: string;
        },
        finish_reason: string;
        index: number;
    }[];
}

interface GPTMessage {
    role: "user" | "assistant";
    content: string;
}

const messageToGPT = ({ source, text }: Message) => ({ role: source, content: text });

const send = async (messages: Message[]): Promise<GPTMessage> => {
    const request = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant. Your name is Jipiti and you're proud of it." },
            ...messages.map(messageToGPT)
        ],
        temperature: 0.5
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(request)
    });

    const data = await response.json() as GPTResponse;

    Log.create({ target: "openapi", request, response: data });

    return data.choices[0].message;
};

export default { send };
