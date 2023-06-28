import UserModel from "../model/user";
import { User, Message } from "../types";

const getById = async (userId: string): Promise<Message> => {
    return (await UserModel.findOne({ _id: userId })).toJSON();
};

const upsert = async (email: string, user: Partial<User>): Promise<User> => {
    return (await UserModel.findOneAndUpdate(
        { email }, user, { upsert: true, new: true }
    )).toJSON();
};

export default { getById, upsert };