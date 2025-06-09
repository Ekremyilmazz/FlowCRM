import { Request, Response } from 'express';
import { pool } from '../db';
import { ActivityLog, CreateActivityLogInput } from '../types/ActivityLog';

export const getActivityLogs = async (_req: Request, res: Response<ActivityLog[]>) => {
  try {
    const result = await pool.query(`
      SELECT a.*, u.name AS user_name
      FROM activity_log a
      JOIN users u ON a.user_id = u.id
      ORDER BY timestamp DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};


export const createActivityLog = async (
  req: Request<{}, {}, CreateActivityLogInput>, 
  res: Response<ActivityLog>
) => {
  const { user_id, action } = req.body;
  const ip_address = req.ip;

  try {
    const result = await pool.query(
      `INSERT INTO activity_log (user_id, action, ip_address)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, action, ip_address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(null as any);
  }
};
