import { z } from 'zod';

// Schemas de validation pour les entités principales

export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email('Email invalide'),
    created_at: z.string().datetime(),
});

export const profileSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
    email: z.string().email('Email invalide'),
    avatar_url: z.string().url().nullable(),
    company: z.string().max(100).nullable(),
    phone: z.string().regex(/^\+?[\d\s-]{8,20}$/, 'Numéro de téléphone invalide').nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100),
    description: z.string().max(1000).nullable(),
    price: z.number().positive('Le prix doit être positif'),
    category: z.string().max(50).nullable(),
    image_url: z.string().url().nullable(),
    stock: z.number().int().nonnegative('Le stock ne peut pas être négatif').nullable(),
    approved: z.boolean().nullable(),
    seller_id: z.string().uuid().nullable(),
});

export const customerSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
    email: z.string().email('Email invalide'),
    phone: z.string().regex(/^\+?[\d\s-]{8,20}$/, 'Numéro de téléphone invalide').nullable().optional(),
    company: z.string().max(100).nullable().optional(),
    status: z.enum(['active', 'inactive', 'prospect', 'lead']),
    value: z.number().nonnegative().nullable().optional(),
});

export const dealSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(200),
    value: z.number().positive('La valeur doit être positive'),
    stage: z.enum(['lead', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost']),
    probability: z.number().min(0).max(100).nullable().optional(),
    close_date: z.string().datetime().nullable().optional(),
    contact: z.string().max(100).nullable().optional(),
    company_id: z.string().uuid().nullable().optional(),
    product_id: z.string().uuid().nullable().optional(),
});

export const taskSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(200),
    description: z.string().max(1000).nullable().optional(),
    status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    due_date: z.string().datetime().nullable().optional(),
    assigned_to: z.string().uuid().nullable().optional(),
});

export const saleSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    product_id: z.string().uuid(),
    customer_id: z.string().uuid().nullable().optional(),
    quantity: z.number().int().positive('La quantité doit être positive'),
    unit_price: z.number().positive('Le prix unitaire doit être positif'),
    total_price: z.number().positive('Le prix total doit être positif'),
    sale_date: z.string().datetime(),
});

export const subscriptionConfigSchema = z.object({
    hostname: z.string()
        .min(3, 'Le hostname doit contenir au moins 3 caractères')
        .max(50, 'Le hostname ne peut pas dépasser 50 caractères')
        .regex(/^[a-z0-9-]+$/, 'Le hostname ne peut contenir que des lettres minuscules, chiffres et tirets'),
    logo_desc: z.string()
        .min(10, 'La description doit contenir au moins 10 caractères')
        .max(500, 'La description ne peut pas dépasser 500 caractères'),
    ram: z.number().min(8, 'Minimum 8GB de RAM').max(128, 'Maximum 128GB de RAM'),
    cpu: z.number().min(2, 'Minimum 2 cores').max(32, 'Maximum 32 cores'),
    nvme: z.number().min(50, 'Minimum 50GB de stockage').max(2000, 'Maximum 2TB de stockage'),
    db: z.boolean(),
    bandwidth: z.number().min(100, 'Minimum 100GB de bande passante').max(10000, 'Maximum 10TB de bande passante'),
    addon_backup: z.boolean(),
    addon_monitoring: z.boolean(),
    addon_ssl: z.boolean(),
    addon_cdn: z.boolean(),
});

// Types inférés des schemas
export type UserInput = z.infer<typeof userSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type DealInput = z.infer<typeof dealSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type SaleInput = z.infer<typeof saleSchema>;
export type SubscriptionConfigInput = z.infer<typeof subscriptionConfigSchema>;

// Helpers de validation
export const validateProduct = (data: unknown) => productSchema.safeParse(data);
export const validateCustomer = (data: unknown) => customerSchema.safeParse(data);
export const validateDeal = (data: unknown) => dealSchema.safeParse(data);
export const validateTask = (data: unknown) => taskSchema.safeParse(data);
export const validateSale = (data: unknown) => saleSchema.safeParse(data);
export const validateSubscription = (data: unknown) => subscriptionConfigSchema.safeParse(data);

// Fonction utilitaire pour formater les erreurs Zod
export const formatZodErrors = (errors: z.ZodError): Record<string, string> => {
    const formattedErrors: Record<string, string> = {};
    errors.errors.forEach((error) => {
        const path = error.path.join('.');
        formattedErrors[path] = error.message;
    });
    return formattedErrors;
};

// Sanitization helpers
export const sanitizeString = (str: string): string => {
    return str
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript protocols
        .slice(0, 10000); // Limit string length
};

export const sanitizeEmail = (email: string): string => {
    return email.toLowerCase().trim();
};

export const sanitizeHostname = (hostname: string): string => {
    return hostname
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};
