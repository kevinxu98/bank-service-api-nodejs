import { AccountStatusDTO } from "../dtos/dtos";

export class BankAcctCreatedEvent {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public acctStatus: AccountStatusDTO,
        public version: number
    ) {}
}