import { Request, Response} from 'express';
import { pool} from '../db';
import { Product, CreateProductInput } from '../types/Product';


export const getAllProducts = async (_req: Request, res: Response<Product[]>) => {
    try{
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
};

export const createProduct = async (
    req: Request<{},{}, CreateProductInput>, 
    res: Response<Product>
) => {
    const { name, price, category, stock} = req.body;
    try{
        const result = await pool.query(`
           INSERT INTO products (name, price, category, stock)
           VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, price, category, stock]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json(null as any);
    }
};