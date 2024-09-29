import { BankAcctCreatedEvent, ChequingDepositEvent, ChequingWithdrawalEvent, SavingsDepositEvent, SavingsWithdrawalEvent } from "../events/events";
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
        this.firstName = '';
        this.lastName = '';
        this.chequingAcctBalance = 0;
        this.savingsAcctBalance = 0;
        this.eventStore = new EventStore();
    }

    async hydrateAggregate(): Promise<void> {
        const events = await this.eventStore.getEventsByUserId(this.id);
        for (const event of events) {
            this.applyState(event);
        }
    }

    createBankAcct(userId: string, firstName: string, lastName: string, chequingAcctBalance: number, savingsAcctBalance: number): BankAcctCreatedEvent {
        const id = generateId();
        const event = new BankAcctCreatedEvent(id, userId, BankAcctCreatedEvent.eventType, firstName, lastName, chequingAcctBalance, savingsAcctBalance, this.version + 1);
        this.applyState(event);
        return event;
    }

    depositChequingAcct(userId: string, amount: number): ChequingDepositEvent {
        const id = generateId();
        const event = new ChequingDepositEvent(id, userId, ChequingDepositEvent.eventType, amount, this.version + 1);
        this.applyState(event);
        return event;
    }

    withdrawChequingAcct(userId: string, amount: number): ChequingWithdrawalEvent {
        const id = generateId();
        this.chequingAcctBalance = (this.chequingAcctBalance ?? 0) - amount;
        const event = new ChequingWithdrawalEvent(id, userId, ChequingWithdrawalEvent.eventType, amount, this.version + 1);
        this.applyState(event);
        return event;
    }

    depositSavingsAcct(userId: string, amount: number): SavingsDepositEvent {
        const id = generateId();
        this.savingsAcctBalance = (this.savingsAcctBalance ?? 0) + amount;
        const event = new SavingsDepositEvent(id, userId, SavingsDepositEvent.eventType, amount, this.version + 1);
        this.applyState(event);
        return event;
    }

    withdrawSavingsAcct(userId: string, amount: number): SavingsWithdrawalEvent {
        const id = generateId();
        this.savingsAcctBalance = (this.savingsAcctBalance ?? 0) - amount;
        const event = new SavingsWithdrawalEvent(id, userId, SavingsWithdrawalEvent.eventType, amount, this.version + 1);
        this.applyState(event);
        return event;
    }

    applyState(event: any): void {
        if (event.type === BankAcctCreatedEvent.eventType) {
            this.id = event.userId;
            this.version = event.version;
            this.firstName = event.firstName;
            this.lastName = event.lastName;
            this.chequingAcctBalance = event.chequingAcctBalance;
            this.savingsAcctBalance = event.savingsAcctBalance;
        } else if (event.type === ChequingDepositEvent.eventType) {
            this.id = event.userId;
            this.version = event.version;
            this.chequingAcctBalance = (this.chequingAcctBalance ?? 0) + event.amount;
        } else if (event.type === ChequingWithdrawalEvent.eventType) {
            this.id = event.userId;
            this.version = event.version;
            this.chequingAcctBalance = (this.chequingAcctBalance ?? 0) - event.amount;
        } else if (event.type === SavingsDepositEvent.eventType) {
            this.id = event.userId;
            this.version = event.version;
            this.savingsAcctBalance = (this.savingsAcctBalance ?? 0) + event.amount;
        } else if (event.type === SavingsWithdrawalEvent.eventType) {
            this.id = event.userId;
            this.version = event.version;
            this.savingsAcctBalance = (this.savingsAcctBalance ?? 0) - event.amount;
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