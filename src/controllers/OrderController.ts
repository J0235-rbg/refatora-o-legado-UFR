import { Request, Response } from 'express';
import { error } from "console";
import { EtherealMailProvider } from "../providers/EtherealMailProvider";
import { PrismaOrderRepository } from "../repository/PrismaOrderRepository";
import { NotificationService } from "../service/NotificationService";
import { OrderService } from "../service/OrderService";

const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);
const orderRepository = new PrismaOrderRepository();
const orderService = new OrderService(orderRepository, notificationService);

export class OrderController {
    async handle(req: Request, res: Response){
        try {
            const order = await orderService.processOrder(req.body);
            return res.status(201).json(order);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}