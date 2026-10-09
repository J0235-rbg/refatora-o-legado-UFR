export interface IProduct {
    id: number;
    name: string;
    // type: 'physical' | 'digital';
    price: number;
    calculateFreight(): number;
}