export interface IOutletContext {
  alertIsShown: boolean;
  isProcessing: boolean;
  alertText: string;
  userId: number | null;
  initConsent: boolean;
  showAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertText: React.Dispatch<React.SetStateAction<string>>;
  setAggBankId: React.Dispatch<React.SetStateAction<string | null>>;
  resources: string[];
  selectBank: React.Dispatch<React.SetStateAction<string | null>>;
  resourcesModalIsShown: boolean;
  selectedBank: string | null;
  showResourcesModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetAggBankId: (value: string | null) => void;
}
