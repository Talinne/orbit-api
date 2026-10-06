import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser({ name, email, password });
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const result = await loginUser({ email, password });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}