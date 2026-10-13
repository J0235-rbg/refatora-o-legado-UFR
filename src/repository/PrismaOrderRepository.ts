import { PrismaClient } from '@prisma/client';
import { IOrderRepository, CreateOrderDTO } from './IOrderRepository';

// Instância compartilhada ou injetada do PrismaClient
const prisma = new PrismaClient();

export class PrismaOrderRepository implements IOrderRepository {
  async create(data: CreateOrderDTO): Promise<any> {
    return await prisma.order.create({
      data: {
        customer: data.customer,
        total: data.total,
        freight: data.freight,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }
}