import { AccountStatusDTO } from "../dtos/dtos";


export class CreateBankRecordCommand {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public acctStatus: AccountStatusDTO
    ) {}
}

