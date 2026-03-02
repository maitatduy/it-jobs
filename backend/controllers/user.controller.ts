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
