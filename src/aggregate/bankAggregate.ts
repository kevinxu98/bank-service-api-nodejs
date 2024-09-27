import { AccountStatusDTO } from "../dtos/dtos";
import { BankAcctCreatedEvent } from "../events/events";


class BankAggregate {
    id: string;
    version: number;

    constructor(id: string, version: number = 0) {
        this.id = id;
        this.version = version;
    }

    apply(event: any): void {
        if (event instanceof BankAcctCreatedEvent) {
            this.id = event.id;
            this.version = event.version;
        }
    }

    createBankAcct(id: string, firstName: string, lastName: string, acctStatus: AccountStatusDTO): BankAcctCreatedEvent {
        const event = new BankAcctCreatedEvent(id, firstName, lastName, acctStatus, this.version + 1);
        return event;
    }   

    static loadFromEvents(events: any[]): BankAggregate {
        const aggregate = new BankAggregate('', 0);
        for (const event of events) {
            aggregate.apply(event);
        }
        return aggregate;
    }
}

export default BankAggregate;