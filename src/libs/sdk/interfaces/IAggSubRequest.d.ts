export default interface IAggSubRequest {
    bankId: string;
    userId: number | string;
    onCompletedStatus?: () => void;
    onInProcessStatus?: () => void;
    onFailedStatus?: () => void;
    onServerError?: (response: unknown) => void;
}
