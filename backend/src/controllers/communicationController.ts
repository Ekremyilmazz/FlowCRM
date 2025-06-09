import { Request, Response} from 'express';
import { pool } from '../db';
import { Communication, CreateCommunicationInput } from '../types/Communication';

export const getAllCommunications = async (_req: Request, res: Response<Communication[]>) => {
    try{
        const result = await pool.query(`
            SELECT c.*, u.name AS user_name, cust.name AS customer_name
            FROM communications c
            JOIN users u ON c.user_id = u.id
            JOIN customers cust ON c.customer_id = cust.id
            ORDER BY c.timestamp DESC
        `);
        res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
};

export const createCommunication = async (
    req: Request<{}, {}, CreateCommunicationInput>, 
    res: Response<Communication>
) => {
   const { user_id, customer_id, type, content} = req.body;
   try{
    const result = await pool.query(`
        INSERT INTO communications (user_id, customer_id, type, content)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, customer_id, type, content]
    );
    res.status(201).json(result.rows[0]);
   }catch (err){
    console.error(err);
    res.status(500).json(null as any);
   }
};
