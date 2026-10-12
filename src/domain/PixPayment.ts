import { IPaymentMethod } from "./Interface/IPaymentMethod";

export class PixPayment implements IPaymentMethod {

    async process(amount: number, details?: any): Promise<boolean> {
        console.log(`[PIX] Gerando QR code para pagamente de R$ ${amount}`);
        return true;
    }
}