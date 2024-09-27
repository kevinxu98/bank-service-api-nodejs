import { BankAcctCreatedEvent } from "../events/events";
import { ProjectionDisplay } from "../models/displays";
import { generateId } from "../utils/helpers";


class BankAggregate {
    id: string;
    version: number;
    firstName?: string;
    lastName?: string;
    chequingAcctBalance?: number;
    savingsAcctBalance?: number;

    constructor(id: string, version: number = 0) {
        this.id = id;
        this.version = version;
    }

    static loadFromEvents(events: any[]): BankAggregate {
        const aggregate = new BankAggregate('', 0);
        for (const event of events) {
            aggregate.apply(event);
        }
        return aggregate;
    }

    createBankAcct(userId: string, firstName: string, lastName: string, chequingAcctBalance: number, savingsAcctBalance: number): BankAcctCreatedEvent {
        const id = `${BankAcctCreatedEvent.eventType}:${generateId()}`;
        const event = new BankAcctCreatedEvent(id, userId, firstName, lastName, chequingAcctBalance, savingsAcctBalance, this.version + 1);
        return event;
    }   

    apply(event: any): void {
        if (event instanceof BankAcctCreatedEvent) {
            this.id = event.userId;
            this.version = event.version;
            this.firstName = event.firstName;
            this.lastName = event.lastName;
            this.chequingAcctBalance = event.chequingAcctBalance;
            this.savingsAcctBalance = event.savingsAcctBalance;
        }
    }

    projectionDisplay(): ProjectionDisplay {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            chequingAcctBalance: this.chequingAcctBalance,
            savingsAcctBalance: this.savingsAcctBalance,
            version: this.version
        };
    }
}

export default BankAggregate;