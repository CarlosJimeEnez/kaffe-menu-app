export interface OrdersDetailsInsertDTO {
    orderId: number,
    price: number, 
    productId: number,
    sizeId: number,
    quantity: number
}

export interface OrdersDetailsReturnDTO {
    id: number,
    orderId: number,
    price: number,
    productId: number,
    sizeId: number,
    quantity: number
}