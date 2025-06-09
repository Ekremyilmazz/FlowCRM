import { Request, Response } from 'express';
import { pool } from '../db';
import { CreateCustomerInput, Customer } from '../types/Customer';


export const getAllCustomers = async (_req: Request, res: Response<Customer[]>) => {
    try{
        const result = await pool.query('SELECT * FROM customers');
        res.json(result.rows);
    }catch (err){
        console.error(err);
        res.status(500).json([]);
    }
};

export const createCustomer = async (
    req: Request<{},{},CreateCustomerInput>, 
    res: Response<Customer>
) => {
    const {name, company, contact_info,segment} = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO customers (name, company, contact_info, segment)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, company, contact_info, segment]
        );
        res.status(201).json(result.rows[0]);
    }catch (err){
        console.error(err);
        res.status(500).json(null as any); // Typescript için bir workaround
    }
};
