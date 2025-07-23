import type { Timestamp } from "firebase/firestore";


export interface Coffee {
    id: number | string;
    title: string;
    description: string;
    ingredients: string[];
    image: string;
}

export interface MyCoffee extends Coffee {

    published?: boolean;
    userId?: string;
    userDisplayName?: string;
    createdAt?: Timestamp;


}