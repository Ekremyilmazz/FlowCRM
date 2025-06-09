import { Request, Response } from 'express';
import { pool } from '../db';
import { SalesProduct, CreateSalesProductInput } from '../types/SalesProduct';

export const getAllSalesProducts = async (_req: Request, res: Response<SalesProduct[]>) => {
    try {
        const result = await pool.query(`
            SELECT sp.*, p.name AS product_name, s.id AS sale_id
            FROM sales_products sp
            JOIN products p ON sp.product_id = p.id
            JOIN sales s ON sp.sale_id = s.id
            `);
            res.json(result.rows);
    }catch (err){
        console.error(err);
        res.status(500).json([]);
    }
};


export const addProductToSale = async (
    req: Request<{}, {}, CreateSalesProductInput>, 
    res: Response<SalesProduct>
) => {
    const { sale_id, product_id, quantity} = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO sales_products (sale_id, product_id, quantity)
            VALUES ($1, $2, $3) RETURNING *`,
            [sale_id, product_id, quantity]
        );
        res.status(201).json(result.rows[0]);
    }catch (err) {
        console.error(err);
        res.status(500).json(null as any);
    }
};
