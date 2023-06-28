import { Message } from "../types";
import MessageModel from "../model/message";

const create = async (message: Partial<Message>): Promise<Message> => {
    return (await MessageModel.create(message)).toJSON();
};

const get = async ({ userId }: Partial<Message>): Promise<Message[]> => {
    const messages = await MessageModel.find({ userId });
    return messages.map((message) => message.toJSON());
};

export default { create, get };
