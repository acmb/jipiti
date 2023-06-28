export interface Message {
    userId: string;
    text: string;
    source: "user" | "assistant";
}

export interface User {
    _id: string;
    name: string;
    email: string;
    picture: string;
}
