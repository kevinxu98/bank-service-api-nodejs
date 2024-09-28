import { BankAcctCreatedEvent } from "../events/events";
import { ProjectionDisplay } from "../models/displays";
import { generateId } from "../utils/helpers";
import { EventStore } from "../db/eventStore";


class BankAggregate {
    id: string;
    version: number;
    firstName?: string;
    lastName?: string;
    chequingAcctBalance?: number;
    savingsAcctBalance?: number;
    eventStore: EventStore;

    constructor(id: string, version: number = 0) {
        this.id = id;
        this.version = version;
        this.eventStore = new EventStore();
    }

    async hydrateAggregate(): Promise<BankAggregate> {
        const events = await this.eventStore.getEvents(this.id);
        const aggregate = new BankAggregate('', 0);
        for (const event of events) {
            aggregate.apply(event);
        }
        return aggregate;
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

    createBankAcct(userId: string, firstName: string, lastName: string, chequingAcctBalance: number, savingsAcctBalance: number): BankAcctCreatedEvent {
        const id = generateId();
        const event = new BankAcctCreatedEvent(id, userId, BankAcctCreatedEvent.eventType, firstName, lastName, chequingAcctBalance, savingsAcctBalance, this.version + 1);
        this.apply(event);
        return event;
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