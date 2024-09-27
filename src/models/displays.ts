
export interface AccountSummary {
    chequingAcctBalance: number;
    savingsAcctBalance: number;
}

export interface BankDisplay {
    id: string;
    firstName: string;
    lastName: string;
    acctStatus: AccountSummary;
}