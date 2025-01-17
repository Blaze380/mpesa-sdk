type ApiConfig = {
    apiKey?: string;
    publicKey?: string;
    bearerToken?: string;
    useSSL?: boolean;
    webhook?: boolean;
    serviceProviderCode: string;
};
type RequestParams = {
    input_ThirdPartyReference?: string;
    input_QueryReference?: string;
    input_ServiceProviderCode?: string;
    input_TransactionReference?: string;
    input_CustomerMSISDN?: string;
    input_Amount?: string;
    input_PrimaryPartyCode?: string;
    input_ReceiverPartyCode?: string;
    input_SecurityCredential?: string;
    input_InitiatorIdentifier?: string;
    input_ReversalAmount?: string;
    input_TransactionID?: string;
};
type C2BParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_ReceiverPartyCode">;
type SyncC2B = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName">;
type B2CParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_ReceiverPartyCode">;
type SyncB2C = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName">;
type B2BParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_CustomerMSISDN">;
type SyncB2B = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName">;
type ReversalParams = Omit<RequestParams, "input_ReceiverPartyCode" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_CustomerMSISDN" | "input_TransactionReference" | "input_Amount">;
type SyncReversal = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName">;
type QueryTransactionStatusParams = Omit<RequestParams, "input_ReceiverPartyCode" | "input_ServiceProviderCode" | "input_PrimaryPartyCode" | "input_CustomerMSISDN" | "input_TransactionReference" | "input_Amount" | "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential">;
type SyncTransactionStatus = Omit<SyncResponse, "output_CustomerName" | "output_TransactionID">;
type CustomerNameParams = Omit<RequestParams, "input_Amount" | "input_QueryReference" | "input_TransactionReference">;
type SyncCustomerName = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_TransactionID">;
type SyncResponse = {
    output_ConversationID?: string;
    output_TransactionID?: string;
    output_ResponseDesc?: string;
    output_ResponseCode?: string;
    output_ThirdPartyReference?: string;
    output_ResponseTransactionStatus?: "Cancelled" | "Completed" | "Expired" | "N/A";
    output_CustomerName?: string;
};
type AsyncResponse = {
    input_OriginalConversationID?: string;
    input_ThirdPartyReference?: string;
    input_TransactionID?: string;
    input_ResultCode?: string;
    input_ResultDesc?: string;
    input_ResponseTransactionStatus?: "Cancelled" | "Completed" | "Expired" | "N/A";
    replyMpesa: (params: AsyncResponseAfterRequest) => Promise<void>;
};
type AsyncResponseAfterRequest = {
    output_OriginalConversationID: string;
    output_ResponseDesc: string;
    output_ResponseCode: string;
    output_ThirdPartyConversationID: string;
};

declare class MpesaClient {
    private readonly apiConfig;
    private readonly baseUrl;
    private readonly origin;
    private readonly headers;
    constructor(config: ApiConfig);
    static generateBearerToken(apiKey: string, publicKey: string): string;
    private getUrl;
    private post;
    private put;
    private get;
    private getStringParams;
    queryTransactionStatus(params: QueryTransactionStatusParams): Promise<SyncTransactionStatus>;
    c2b(params: C2BParams): Promise<SyncC2B>;
    b2c(params: B2CParams): Promise<SyncB2C>;
    b2b(params: B2BParams): Promise<SyncB2B>;
    reversalTransaction(params: ReversalParams): Promise<SyncReversal>;
    queryCustomerName(params: CustomerNameParams): Promise<SyncCustomerName | AsyncResponse>;
    private addServiceCodeIntoBody;
    private getReplyMpesa;
}

export { MpesaClient };
