import { Request, Response } from 'express';
import { pool } from '../db';
import { User, CreateUserInput } from '../types/User';

export const getAllUsers = async (_req: Request, res: Response<User[]>) => {
    try{
        const result = await pool.query('SELECT id, name, email, role FROM users');
        res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
};


export const createUser = async (
    req: Request<{}, {}, CreateUserInput>, 
    res: Response<User>
) => {
    const { name, email, role, password } = req.body;
    try{
        const result = await pool.query(
            'INSERT INTO users (name, email, role, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, role, password]
        );
        res.status(201).json(result.rows[0])
    }catch(err){
        console.error(err);
        res.status(500).json(null as any);
    };
}