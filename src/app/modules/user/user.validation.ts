import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name:z.string().max(99),
        email:z.string().email(),
        password:z
        .string({
          invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' }),
        phone:z.string(),
        role:z.enum(['admin','user']),
        address:z.string()
    
    })
})



const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const userValidation = {
    createUserValidationSchema,loginValidationSchema
}