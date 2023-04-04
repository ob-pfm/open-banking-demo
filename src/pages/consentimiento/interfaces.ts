export interface IConsentRenewEvent {
  consentId: string;
  originBankName: string | undefined;
  customerIdentification: string | undefined | null;
  cpf: string | undefined | null;
  targetInstitution: string | undefined;
  deadline: number | undefined;
  status: StatusConsent;
  isSynchronized: boolean | undefined;
  expirationDate: number | Date | undefined;
  financialEntity: Bank;
}
interface Bank {
  bankId: string;
  name: string;
  imagePath: string;
  financialEntityId: number;
  isBankAggregation: boolean;
}

type StatusConsent = 'ACTIVATED' | 'EXPIRED' | 'PENDING' | 'CANCELLED';
