export interface OrdersDetailsInsertDTO {
    orderId: number,
    price: number, 
    productId: number,
    sizeId: number,
    quantity: number
}

export interface OrdersDetailsReturnDTO {
    Id: number,
    OrderId: number,
    Price: number,
    ProductId: number,
    SizeId: number,
    Quantity: number
}