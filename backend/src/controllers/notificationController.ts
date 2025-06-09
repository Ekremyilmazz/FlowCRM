import { Request, Response } from 'express';
import { pool } from '../db';
import { Notification, CreateNotificationInput } from '../types/Notification';  

export const getNotificationsByUser = async (req: Request, res: Response<Notification[]>) => {
  const userId = parseInt(req.params.userId);
  try {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

export const createNotification = async (
  req: Request<{}, {}, CreateNotificationInput>, 
  res: Response<Notification>
) => {
  const { user_id, message, is_read } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, message, is_read)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, message, is_read ?? false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(null as any);
  }
};
