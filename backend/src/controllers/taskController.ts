import { Request, Response} from 'express';
import { pool} from '../db';
import { Task, CreateTaskInput} from '../types/Task';

export const getAllTasks = async (_req: Request, res: Response<Task[]>) => {
    try{
        const result = await pool.query(`
            SELECT t.*, u.name AS assigned_user
            FROM tasks t
            JOIN users u ON t.assigned_to = u.id
            ORDER BY deadline ASC
            `);
            res.json(result.rows);
    }catch (err) {
     console.error(err);
     res.status(500).json([]);
    }
};

export const createTask = async (
    req: Request<{}, {}, CreateTaskInput>, 
    res: Response<Task>
) => {
    const {assigned_to, title, priority, deadline, is_completed = false} = req.body;
    try {
        const result = await pool.query(
            `
            INSERT INTO tasks ( assigned_to, title, priority, deadline, is_completed)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [assigned_to, title, priority, deadline, is_completed]
        );
        res.status(201).json(result.rows[0]);
    }catch (err) {
        console.error(err);
        res.status(500).json(null as any);
    }
};