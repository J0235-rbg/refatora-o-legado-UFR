import { IMailProvider, IMailMessage } from "./IMailProvider";

export class EtherealMailProvider implements IMailProvider {
    async sendMail(message: IMailMessage): Promise<void> {
        console.log(`[Email enviado para ${message.to}]: Assunto: ${message.subject} - Corpo: ${message.body}`);
    }
}