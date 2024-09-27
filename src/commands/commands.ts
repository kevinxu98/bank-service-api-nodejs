
export class CreateBankRecordCommand {
    constructor(
        public firstName: string,
        public lastName: string,
        public chequingAcctBalance: number,
        public savingsAcctBalance: number
    ) {}
}

