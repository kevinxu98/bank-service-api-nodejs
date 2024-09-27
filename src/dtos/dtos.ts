export interface BankCreationDTO {
    id: string;
    firstName: string;
    lastName: string;
    acctStatus: AccountStatusDTO;
    version: number;
}

export interface AccountStatusDTO {
    chequingAcctBalance: number;
    chequingAcctTransaction?: number | undefined;
    savingsAcctBalance: number;
    savingsAcctTransaction?: number | undefined;
}

