import { PrismaClient } from "@prisma/client";
import { ProductFactory } from "../domain/ProductFactory"; 
import { IOrderRepository } from "../repository/IOrderRepository";
import { NotificationService } from "./NotificationService";
import { PaymentFactory } from "../payments/PaymentFactory";

const prisma = new PrismaClient();

export interface ProcessOrderInput {
    customer: string;
    items: Array<{ productId: number; quantity: number }>;
    paymentMethod: string;
    paymentDetails?: any;
}

export class OrderService {
    constructor(
        private orderRepository: IOrderRepository,
        private notificationService: NotificationService
    ) {}

    async processOrder(input: ProcessOrderInput){
        let itemsTotal = 0;
        let totalFreight = 0;
        const orderItems = [];

        for (const item of input.items){
            const productData = await prisma.product.findUnique({ 
                where: { id: item.productId },
            });

            if(!productData){
                throw new Error(`Produto com ID ${item.productId} não encontrado.`);
            }

            const product = ProductFactory.createProduct(productData);
            const freight = product.calculateFreight();
            const itemSubtotal = product.price * item.quantity;

            itemsTotal += itemSubtotal;
            totalFreight += freight * item.quantity;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        const totalAmount = itemsTotal + totalFreight;

        const paymentStrategy = PaymentFactory.createPaymentMethod(input.paymentMethod);
        const paymentSucess = await paymentStrategy.process(totalAmount, input.paymentDetails);

        if(!paymentSucess){
            throw new Error('Falha no pagamento tente novamente.');
        }

        const order = await this.orderRepository.create({
            customer: input.customer,
            total: totalAmount,
            freight: totalFreight,
            items: orderItems,
        });

        await this.notificationService.sendOrderConfirmation(
            input.customer,
            order.id,
            totalAmount
        );

        return order;
    }
}