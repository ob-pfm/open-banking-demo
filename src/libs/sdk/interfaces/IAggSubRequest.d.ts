export default interface IAggSubRequest {
    bankId: string;
    userId: number | string;
    onConsentRequestedStatus?: () => void;
    onConsentGrantedStatus?: () => void;
    onConsentDeletedStatus?: () => void;
    onAggregationStartedStatus?: () => void;
    onAggregationCompletedStatus?: () => void;
    onFailedStatus?: () => void;
    onServerError?: (response: unknown) => void;
}
