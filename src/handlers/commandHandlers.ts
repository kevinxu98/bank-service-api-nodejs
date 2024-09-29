import BankAggregate from '../aggregate/bankAggregate';
import { CreateBankRecordCommand } from '../commands/commands';
import { EventStore } from '../db/eventStore';
import { generateId } from '../utils/helpers';

export class CreateBankRecordCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: CreateBankRecordCommand): Promise<any> {
        // create aggregate instance
        const userId = generateId();
        const bankAggregate = new BankAggregate(userId);
        const { firstName, lastName, chequingAcctBalance, savingsAcctBalance } = command;

        const event = bankAggregate.createBankAcct(userId, firstName, lastName, chequingAcctBalance, savingsAcctBalance);
        const updatedProjection = bankAggregate.projectionDisplay();

        // save the event to the event store
        await this.eventStore.saveEvent(event, updatedProjection);

        return event;
    }
}

export class ChequingDepositCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: any): Promise<any> {
        const { id, amount } = command;
        const bankAggregate = new BankAggregate(id);
        await bankAggregate.hydrateAggregate();
        
        const event = bankAggregate.depositChequingAcct(id, amount);
        const updatedProjection = bankAggregate.projectionDisplay();

        await this.eventStore.saveEvent(event, updatedProjection);

        return event;
    }
}

export class ChequingWithdrawalCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: any): Promise<any> {
        const { id, amount } = command;
        const bankAggregate = new BankAggregate(id);
        bankAggregate.hydrateAggregate();

        const event = bankAggregate.withdrawChequingAcct(id, amount);
        const updatedProjection = bankAggregate.projectionDisplay();

        await this.eventStore.saveEvent(event, updatedProjection);

        return event;
    }
}

export class SavingsDepositCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: any): Promise<any> {
        const { id, amount } = command;
        const bankAggregate = new BankAggregate(id);
        bankAggregate.hydrateAggregate();

        const event = bankAggregate.depositSavingsAcct(id, amount);
        const updatedProjection = bankAggregate.projectionDisplay();

        await this.eventStore.saveEvent(event, updatedProjection);

        return event;
    }
}

export class SavingsWithdrawalCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: any): Promise<any> {
        const { id, amount } = command;
        const bankAggregate = new BankAggregate(id);
        bankAggregate.hydrateAggregate();

        const event = bankAggregate.withdrawSavingsAcct(id, amount);
        const updatedProjection = bankAggregate.projectionDisplay();

        await this.eventStore.saveEvent(event, updatedProjection);

        return event;
    }
}
