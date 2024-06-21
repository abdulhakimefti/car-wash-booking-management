"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().max(99),
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be string',
        })
            .max(20, { message: 'Password can not be more than 20 characters' }),
        phone: zod_1.z.string(),
        role: zod_1.z.enum(['admin', 'user']),
        address: zod_1.z.string()
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required.' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.userValidation = {
    createUserValidationSchema, loginValidationSchema
};
