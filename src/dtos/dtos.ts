export interface BankCreationIdentifierDTO {
    id: string;
    firstName: string;
    lastName: string;
    summary: BankCreationInfoDTO
}

export interface BankCreationInfoDTO {
    country?: string | undefined;
    chequingAcctBalance: number;
    chequingAcctTransaction?: number | undefined;
    savingsAcctBalance: number;
    savingsAcctTransaction?: number | undefined;
}

