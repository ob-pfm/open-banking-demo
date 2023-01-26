export interface IOutletContext {
  alertIsShown: boolean;
  alertText: string;
  userId: number | null;
  initConsent: boolean;
  showAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertText: React.Dispatch<React.SetStateAction<string>>;
}
