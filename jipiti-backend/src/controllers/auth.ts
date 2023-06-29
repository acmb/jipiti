import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user";
import Log from "../model/log";
import "dotenv/config";

const login = async (req: Request, res: Response) => {
    const body = req.body;
    const credential = jwt.decode(body.credential) as any;

    Log.create({ source: "google", request: { body, credential } });

    const { name, email, picture } = credential;

    let user;

    try {
        user = await User.findOneAndUpdate(
            { email },
            { name, picture },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message })
    }

    
    res.location(`${process.env.FRONTEND_URL}/login?token=${user._id}`);
    res.status(301).send();
};

export default { login };
