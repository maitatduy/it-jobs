import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AccountUser from '../models/account-user.model';

export const registerPost = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    const existAccount = await AccountUser.findOne({
        email: email,
    });

    if (existAccount) {
        res.json({
            code: 'error',
            message: 'Email đã tồn tại trong hệ thống',
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new AccountUser({
        fullName: fullName,
        email: email,
        password: hashedPassword,
    });

    await newAccount.save();

    res.json({
        code: 'success',
        message: 'Đăng ký tài khoản thành công!',
    });
};

export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existAccount = await AccountUser.findOne({
        email: email,
    });

    if (!existAccount) {
        res.json({
            code: 'error',
            message: 'Email không tồn tại trong hệ thống!',
        });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, `${existAccount.password}`);
    if (!isPasswordValid) {
        res.json({
            code: 'error',
            message: 'Mật khẩu không chính xác!',
        });
        return;
    }

    // Tạo JWT
    const token = jwt.sign(
        {
            id: existAccount.id,
            email: existAccount.email,
        },
        `${process.env.JWT_SECRET}`,
        {
            expiresIn: '1d', // Token có thời hạn 1 ngày
        }
    );

    // Lưu token vào cookie
    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000, // Token có hiệu lực trong 1 ngày
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // false: http, true: https
        sameSite: 'lax', // Cho phép gửi cookie giữa các domain
    });

    res.json({
        code: 'success',
        message: 'Đăng nhập thành công!',
    });
};
