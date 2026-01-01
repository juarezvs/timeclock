import z from "zod";

export const employeeInputSchema = z.object({
    name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
    matricula: z.string().min(3, 'Natricula deve ter ao menos 6 caracteres'),
    email: z.string().email("E-mail inválido"),
    cpf: z.string().regex(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve ter 11 dígitos'),
    hiredAt: z.coerce.date().optional(),      // aceita string e converte para Date
    departmentId: z.string().uuid().optional().nullable(),
})

export type employeeInputDTO = z.infer<typeof employeeInputSchema>;