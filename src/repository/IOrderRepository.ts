export interface CreateOrderDTO {
  customer: string;
  total: number;
  freight: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<any>;
}