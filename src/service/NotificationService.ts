import { IMailProvider } from "../providers/IMailProvider";

export class NotificationService {
  constructor(private mailProvider: IMailProvider) {}

  async sendOrderConfirmation(customerEmail: string, orderId: number, totalAmount: number): Promise<void> {
    const subject = `Confirmação do Pedido #${orderId}`;
    const body = `Olá! Seu pedido #${orderId} no valor de R$ ${totalAmount.toFixed(2)} foi processado com sucesso.`;

    await this.mailProvider.sendMail({
      to: customerEmail,
      subject,
      body,
    });
  }
}