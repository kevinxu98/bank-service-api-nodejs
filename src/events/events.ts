
export class BankAcctCreatedEvent {
    static eventType: string = 'BankAcctCreatedEvent';
    constructor(
        public id: string,
        public userId : string,
        public type: string,
        public firstName: string,
        public lastName: string,
        public chequingAcctBalance: number,
        public savingsAcctBalance: number,
        public version: number
    ) {}
}

export class ChequingDepositEvent {
    static eventType: string = 'ChequingDepositEvent';
    constructor(
        public id: string,
        public userId: string,
        public type: string,
        public amount: number,
        public version: number
    ) {}
}

export class ChequingWithdrawalEvent {
    static eventType: string = 'ChequingWithdrawalEvent';
    constructor(
        public id: string,
        public userId: string,
        public type: string,
        public amount: number,
        public version: number
    ) {}
}

export class SavingsDepositEvent {
    static eventType: string = 'SavingsDepositEvent';
    constructor(
        public id: string,
        public userId: string,
        public type: string,
        public amount: number,
        public version: number
    ) {}
}

export class SavingsWithdrawalEvent {
    static eventType: string = 'SavingsWithdrawalEvent';
    constructor(
        public id: string,
        public userId: string,
        public type: string,
        public amount: number,
        public version: number
    ) {}
}