import BankAggregate from '../aggregate/bankAggregate';
import { CreateBankRecordCommand } from '../commands/commands';
import { EventStore } from '../db/eventStore';

export class CreateBankRecordCommandHandler {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    async handle(command: CreateBankRecordCommand): Promise<any> {
        // create aggregate instance
        const bankAggregate = new BankAggregate(command.id);
        const { id, firstName, lastName, acctStatus } = command;
        const event = bankAggregate.createBankAcct(id, firstName, lastName, acctStatus);

        // save the event to the event store
        await this.eventStore.saveEvent(event);

        return event;
    }
}