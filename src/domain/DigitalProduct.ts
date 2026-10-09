import { IProduct } from "./Interface/IProduct";

export class DigitalProduct implements IProduct {


    constructor(
        public id: number,
        public name: string,
        public price: number
    ){}

    calculateFreight(): number {
        // Produtos digitais não têm frete
        return 0;
    }
}