// Payment configuration
// In production, these should come from environment variables

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

// Plan price IDs for Stripe (create these in Stripe Dashboard)
export const STRIPE_PRICE_IDS = {
    free: {
        monthly: null,
        yearly: null,
    },
    pro: {
        monthly: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
        yearly: import.meta.env.VITE_STRIPE_PRICE_PRO_YEARLY || 'price_pro_yearly',
    },
    business: {
        monthly: import.meta.env.VITE_STRIPE_PRICE_BUSINESS_MONTHLY || 'price_business_monthly',
        yearly: import.meta.env.VITE_STRIPE_PRICE_BUSINESS_YEARLY || 'price_business_yearly',
    },
    enterprise: {
        monthly: null,
        yearly: null,
    },
} as const;

// PayPal Plan IDs (create these in PayPal Dashboard)
export const PAYPAL_PLAN_IDS = {
    free: {
        monthly: null,
        yearly: null,
    },
    pro: {
        monthly: import.meta.env.VITE_PAYPAL_PLAN_PRO_MONTHLY || 'P-pro-monthly',
        yearly: import.meta.env.VITE_PAYPAL_PLAN_PRO_YEARLY || 'P-pro-yearly',
    },
    business: {
        monthly: import.meta.env.VITE_PAYPAL_PLAN_BUSINESS_MONTHLY || 'P-business-monthly',
        yearly: import.meta.env.VITE_PAYPAL_PLAN_BUSINESS_YEARLY || 'P-business-yearly',
    },
    enterprise: {
        monthly: null,
        yearly: null,
    },
} as const;

export type PlanId = 'free' | 'pro' | 'business' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';
