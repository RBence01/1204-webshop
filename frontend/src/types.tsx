export type Product = {
    sku: number;
    name: string;
    description: string;
    img: string;
    price: number;
    discount?: number;
}

export type User = {
    id: number;
    username: string;
    email: string;
    type: UserType;
    promotionalEmails: boolean;
}

export type UserType = 'admin' | 'customer' | 'deleted';