import { IProduct } from "./Interface/IProduct";
import { PhysicalProduct } from "./PhysicalProduct";
import { DigitalProduct } from "./DigitalProduct";

export class ProductFactory {
    static createProduct(data: any): IProduct {
        if(data.type === 'physical') {
            return new PhysicalProduct(data.id, data.name, data.price);
        }
        if(data.type === 'digital'){
            return new DigitalProduct(data.id, data.name, data.price);
        }
        throw new Error(`Tipo de produto não suportado: ${data.type}`);
    }
}