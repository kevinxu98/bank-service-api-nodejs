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