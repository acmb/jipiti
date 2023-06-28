import { Request, Response } from "express";
import OpenAI from "../lib/openai";
import MessageService from "../services/message";
import UserService from "../services/user";

const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.getById(userId);

        if (!data) {
            res.status(404).send();
            return;
        }

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
};

const getUserMessages = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await MessageService.get({ userId });

        if (!data) {
            res.status(404).send();
            return;
        }

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
};

const sendUserMessage = async (req: any, res: any) => {
    const { userId } = req.params;
    const { text } = req.body;

    try {
        MessageService.create({ userId, text, source: "user" });

        const messages = await MessageService.get({ userId });

        const { content, role } = await OpenAI.send(messages);

        const response = await MessageService.create({
            userId,
            // text: choice.content.replace(/\n/g, ""),
            text: content,
            source: role
        });

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message })
    }
};

export default { getUserById, getUserMessages, sendUserMessage };
