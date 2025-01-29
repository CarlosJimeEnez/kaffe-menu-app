import { OrderReturnDTO } from "./order";
import { OrdersDetailsReturnDTO } from "./ordersDetails";
import { UserReturnDTO } from "./usuario";

export interface UserWithOrderAndOrderDetail {
    user: UserReturnDTO;
    order: OrderReturnDTO;
    orderDetails: OrdersDetailsReturnDTO[];
}