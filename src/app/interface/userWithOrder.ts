import { OrderReturnDTO } from "./order";
import { UserReturnDTO } from "./usuario";

export interface UserWithOrder {
    user: UserReturnDTO,
    order: OrderReturnDTO
}