
export class CreateBankRecordCommand {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public chequingAcctBalance: number,
        public savingsAcctBalance: number
    ) {}
}

export class ChequingDepositCommand {
    constructor(
        public id: string,
        public amount: number
    ) {}
}

export class ChequingWithdrawalCommand {
    constructor(
        public id: string,
        public amount: number
    ) {}
}

export class SavingsDepositCommand {
    constructor(
        public id: string,
        public amount: number
    ) {}
}

export class SavingsWithdrawalCommand {
    constructor(
        public id: string,
        public amount: number
    ) {}
}