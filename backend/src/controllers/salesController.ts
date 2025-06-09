import { Request, Response } from 'express';
import { pool } from '../db';
import { Sale, CreateSaleInput } from '../types/Sale';

export const getAllSales = async (_req: Request, res: Response<Sale[]>) => {
    try{
        const result = await pool.query(`
          SELECT s.*, c.name AS customer_name, u.name AS user_name
          FROM sales s
          JOIN customers c ON s.customer_id = c.id
          JOIN users u ON s.user_id = u.id  
         `);
         res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
};

export const createSale = async (
    req: Request<{},{}, CreateSaleInput>, 
    res: Response<Sale>
) => {
    const { customer_id, user_id, amount, status, date} = req.body;
    try{
        const result = await pool.query(`
          INSERT INTO sales (customer_id, user_id, amount, status, date)
          VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [customer_id, user_id, amount, status, date]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json(null as any);
    }
};