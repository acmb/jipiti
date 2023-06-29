import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "./user";
import Log from "../model/log";
import "dotenv/config";

const login = async (req: Request, res: Response) => {
    const body = req.body;
    const credential = jwt.decode(body.credential) as any;

    const { name, email, picture } = credential;

    let user;

    try {
        user = await UserService.upsert(email, { name, picture });
    } catch (error) {
        console.error(error);
        Log.create({ source: "google", request: req.body });
        res.status(400).json({ message: error.message })
    }

    res.location(`${process.env.FRONTEND_URL}/login?token=${user._id}`);
    res.status(301).send();
};

export default { login };
