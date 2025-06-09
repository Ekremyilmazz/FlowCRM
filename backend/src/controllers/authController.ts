import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../db'; 
import { RegisterInput, PublicUser} from '../types/User';
import { LoginInput } from '../types/User';


export const register: RequestHandler  = async (req, res): Promise<void> =>{
    const { name, email, password, role } = req.body as RegisterInput;

    try{
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0){
        res.status(400).json({ message: 'Email already exists' });
        return;
    }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            `INSERT INTO users (name, email, role, password_hash)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, name, email, role`,
            [name, email, role || 'user', hashedPassword]
        );

        const newUser = result.rows[0];
        res.status(201).json(newUser);
    }catch (err){
        console.error('Register Error:',err);
        res.status(500).json({ message: 'Internal server error'});
    }
};

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key';

export const login: RequestHandler = async (req, res): Promise<void> => {
    const { email, password} = req.body as LoginInput;

    try {
        const userResult = await pool.query(
            'SELECT id, name, email, role, password_hash FROM users WHERE email = $1',
            [email]
        );
        if(userResult.rows.length === 0) {
            res.status(401).json({ message: 'Invalid email or password'});
            return;
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
    
        if(!isMatch){
            res.status(401).json({ message: 'Invalid email or password'});
            return;
        }

        const payload = {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
        });
    }catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Internal server error'});
    }
};

export const logout: RequestHandler = (req, res ): void => {
    res.cookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: "Logged out successfully" });
}

export const refreshToken: RequestHandler = (req, res): void => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        res.status(401).json({ message: 'Refresh token is öissing'});
        return;
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decoded: any) => {
        if(err){
            res.status(403).json({ message: 'Invalid refresh token'});
            return;
        }

        const newAccessToken = jwt.sign(
            {
                userId: decoded.userId,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
}