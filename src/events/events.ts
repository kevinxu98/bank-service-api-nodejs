
export class BankAcctCreatedEvent {
    static eventType: string = 'BankAcctCreatedEvent';
    constructor(
        public id: string,
        public userId : string,
        public firstName: string,
        public lastName: string,
        public chequingAcctBalance: number,
        public savingsAcctBalance: number,
        public version: number
    ) {}
}