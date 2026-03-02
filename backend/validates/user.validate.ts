import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const registerPost = (req: Request, res: Response, next: NextFunction) => {
    const registerSchema = Joi.object({
        fullName: Joi.string().trim().min(5).max(50).required().messages({
            'string.empty': 'Vui lòng nhập họ tên!',
            'string.min': 'Họ tên phải có ít nhất 5 ký tự!',
            'string.max': 'Họ tên không được vượt quá 50 ký tự!',
            'any.required': 'Vui lòng nhập họ tên!',
        }),

        email: Joi.string().trim().email().required().messages({
            'string.empty': 'Vui lòng nhập email của bạn!',
            'string.email': 'Email không đúng định dạng!',
            'any.required': 'Vui lòng nhập email của bạn!',
        }),

        password: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (value.length < 8) {
                    return helpers.error('any.custom', {
                        message: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
                    });
                }

                if (!/[A-Z]/.test(value)) {
                    return helpers.error('any.custom', {
                        message: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
                    });
                }

                if (!/[a-z]/.test(value)) {
                    return helpers.error('any.custom', {
                        message: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
                    });
                }

                if (!/\d/.test(value)) {
                    return helpers.error('any.custom', {
                        message: 'Mật khẩu phải chứa ít nhất một chữ số!',
                    });
                }

                if (!/[@$!%*?&]/.test(value)) {
                    return helpers.error('any.custom', {
                        message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
                    });
                }

                return value;
            })
            .messages({
                'string.empty': 'Vui lòng nhập mật khẩu!',
                'any.required': 'Vui lòng nhập mật khẩu!',
                'any.custom': '{{#message}}',
            }),
    });

    const { error } = registerSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {
        return res.json({
            code: 'error',
            message: error.details[0].message,
        });
    }

    next();
};
