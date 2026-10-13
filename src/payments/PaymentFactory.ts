import { IPaymentMethod } from "../domain/Interface/IPaymentMethod";
import { CreditCardPayment } from "../domain/CreditCardPayment";
import { PixPayment } from "../domain/PixPayment";

export class PaymentFactory {
    static createPaymentMethod(type: string): IPaymentMethod {
        if(type === 'credit_card'){
            return new CreditCardPayment();
        }
        if(type === 'pix'){
            return new PixPayment();
        }
        throw new Error(`Método de pagamento não suportado: ${type}`);
    }
}