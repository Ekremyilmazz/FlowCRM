import { Request, Response } from 'express';
import { pool } from '../db';
import {Note, CreateNoteInput} from '../types/Note';


export const getAllNotes = async (_req: Request, res: Response<Note[]>) => {
  try {
    const result = await pool.query(`
      SELECT n.*, u.name AS user_name, c.name AS customer_name
      FROM notes n
      JOIN users u ON n.user_id = u.id
      JOIN customers c ON n.customer_id = c.id
      ORDER BY n.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};


export const createNote = async (
  req: Request<{}, {}, CreateNoteInput>, 
  res: Response<Note>
) => {
  const { customer_id, user_id, content, is_private } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO notes (customer_id, user_id, content, is_private)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_id, user_id, content, is_private ?? false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(null as any);
  }
};
