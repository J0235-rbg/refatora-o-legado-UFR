import { IProduct } from "./Interface/IProduct";

export class DigitalProduct implements IProduct {

    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    calculateFreight(): number {
        // Produtos digitais não têm frete
        return 0;
    }
}