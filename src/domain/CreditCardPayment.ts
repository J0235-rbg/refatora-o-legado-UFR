import { IPaymentMethod } from "./Interface/IPaymentMethod";

export class CreditCardPayment implements IPaymentMethod {
    async process(amount: number, details?: any): Promise<boolean>{
        // Simula o processamento do pagamento com cartão de crédito
        if(!details?.cardNumber || !details?.cvv) {
            throw new Error("Dados do cartão de crédito inválidos ou incompletos.");
        }

        console.log(`[CreditCard] Processamento R$ ${amount} no cartão ${details.cardNumber} com CVV ${details.cvv}`);
        return true;
    }
}